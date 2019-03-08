package com.chemasmas.tictactoe

import android.os.Bundle
import android.support.constraint.ConstraintLayout
import android.support.design.widget.CoordinatorLayout
import android.support.design.widget.Snackbar
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity;
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ExpandableListView
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TextView

import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*

class MainActivity : AppCompatActivity() {

    var gameBoard:Array<CharArray> = Array(3){ CharArray(3) }
    var turn = 'X'
    //var tableLayout:TableLayout? = null
    //var turnTextView:TextView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)


        //turnTextView = findViewById<TextView>(R.id.turnTextView)
        //tableLayout = findViewById(R.id.table_layout) as TableLayout
        startNewGame(true)


        fab.setOnClickListener { startNewGame(false)}
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }


    private fun startNewGame(setClickListener: Boolean) {
        turn = 'X'
        turnTextView?.text = String.format(resources.getString(R.string.turn),turn)

        for(i in 0 until gameBoard.size){
            for(j in 0 until gameBoard[i].size){
                gameBoard[i][j] = ' '
                val cell = (table_layout?.getChildAt(i) as TableRow).getChildAt(j) as TextView
                cell.text = ""
                if(setClickListener){
                    cell.setOnClickListener{ cellClickListener(i,j) }
                }
            }
        }
    }

    private fun cellClickListener(row:Int,column:Int){
        val tv = ((table_layout?.getChildAt(row) as TableRow).getChildAt(column) as TextView)

        if(tv.text.equals("X") || tv.text.equals("O")){
            Snackbar.make(tv ,"Jugada Invalida",Snackbar.LENGTH_SHORT).show()
        }else{
            gameBoard[row][column]= turn
            tv.text = turn.toString()
            turn = if('X'==turn) 'O' else 'X'
            turnTextView?.text = String.format(resources.getString(R.string.turn),turn)
            checkGameStatus()
        }

    }

    private fun isBoardFull(gameBoard:Array<CharArray>): Boolean {
        for (i in 0 until gameBoard.size){
            for(j in  0 until gameBoard[i].size ){
                if(gameBoard[i][j]== ' '){
                    return false;
                }
            }
        }
        return true
    }

    private fun isWinner(gameBoard:Array<CharArray>,w:Char):Boolean {
        for( i in 0 until gameBoard.size ){
            if( gameBoard[i][0] == w && gameBoard[i][1] == w && gameBoard[i][2] == w ){
                return true
            }
            if( gameBoard[0][i] == w && gameBoard[1][i] == w && gameBoard[2][i] == w ){
                return true
            }
        }
        if( gameBoard[0][0] == w && gameBoard[1][1] == w && gameBoard[2][2] == w || gameBoard[0][2] == w && gameBoard[1][1] == w && gameBoard[2][0] == w){
            return true
        }

        return false
    }

    private fun checkGameStatus(){
        var state:String? = null
        if(isWinner(gameBoard,'X')){
            state = String.format( resources.getString(R.string.winner), 'X' )
        }else if(isWinner(gameBoard,'O')){
            state = String.format( resources.getString(R.string.winner), 'O' )
        } else {
            if(isBoardFull(gameBoard)){
                state = resources.getString(R.string.draw)
            }
        }

        if(state!=null){
            turnTextView.text = state
            val builder = AlertDialog.Builder(this)
            builder.setMessage(state)
            builder.setPositiveButton(android.R.string.ok, { dialog, id -> startNewGame(false) })
            val dialog = builder.create()
            dialog.show()
        }


    }
}
