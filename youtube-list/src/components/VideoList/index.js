import React, { Component } from 'react';
import ax from 'axios';
import * as R from 'ramda';

console.log(process);
                               
const APIKEY_YT =  process.env.REACT_APP_APIKEY_YT;
const PATH_STEP_1 = ({username}) => `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${username}&key=${APIKEY_YT}`;
const PATH_STEP_2 = ({playListId}) => `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playListId}&key=${APIKEY_YT}`
const PATH_STEP_2_CONT = ({playListId,nextPageToken}) => `https://www.googleapis.com/youtube/v3/playlistItems?pageToken=${nextPageToken}&part=snippet%2CcontentDetails&maxResults=50&playlistId=${playListId}&key=${APIKEY_YT}`

class VideoList extends Component{
    
    state = {
        youtube:{
            username:"0utKast"
        },
        videos:[]
    }

    constructor(props){
        super(props);

        this.error = this.error.bind(this);
        this.step1 = this.step1.bind(this);
        this.subStep1 = this.subStep1.bind(this);
        this.step2 = this.step2.bind(this);
        this.subStep2 = this.subStep2.bind(this);
        this.subStep2a = this.subStep2a.bind(this);

        this.video = this.video.bind(this);
    }
    
    step1(response){
        let {data} = response;
        let {items} = data;
        R.map( this.subStep1 , items )
        
    }
    subStep1(data){
        let {contentDetails} = data;
        let {relatedPlaylists} = contentDetails;
        let {uploads} = relatedPlaylists
        this.step2(uploads);
        
    }

    step2(data){
        ax.get( PATH_STEP_2( {playListId:data} ) )
            .then( this.subStep2 )
            .catch( this.error );
    }

    subStep2(response){
        let {data} = response;
        let {nextPageToken} = data;
        let {items} = data;

        let {snippet} = items[0];
        let {playlistId} = snippet;
        
        console.log(items);
        this.setState({
                videos: [...this.state.videos , ...items ]
            });

        if( nextPageToken!==undefined ){
            ax.get( PATH_STEP_2_CONT( {
                playListId:playlistId,
                nextPageToken:nextPageToken
             } ) )
                 .then( this.subStep2 )
                 .catch( this.error );
        }            
    }

    subStep2a(response){
        let {data} = response;
        let {nextPageToken} = data;
        console.log(data);
        console.log(nextPageToken);
    }

    error(e){
        console.log(e)
    }

    video(item){
        console.log(item);
        let {contentDetails} = item;
        let {videoId} = contentDetails
        return (
            <div key={videoId}>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }

    componentDidMount(){
        
        ax.get( PATH_STEP_1(this.state.youtube) )
            .then( this.step1 )
            .catch( this.error );
    }
    

    render() {
        return (
          <div>
            { R.map( this.video , this.state.videos.slice(0, 8) )}
          </div>
        );
      }

}

export default VideoList;