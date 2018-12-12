package com.chemasmas.tictactoe

import android.os.Bundle
import android.support.constraint.ConstraintLayout
import android.support.design.widget.CoordinatorLayout
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity;
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ExpandableListView
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TextView

import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    var gameBoard:Array<CharArray> = Array(3){ CharArray(3) }
    var turn = 'X'
    var tableLayout:TableLayout? = null
    var turnTextView:TextView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        HelloKotlin("Get REady for a fun game of Tic Tac Toe").displayMessage( findViewById<ConstraintLayout>(R.id.table_layout) )

        turnTextView = findViewById<TextView>(R.id.turnTextView)
        tableLayout = findViewById(R.id.table_layout) as TableLayout
        startNewGame(true)

        fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show()
        }
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
                val cell = (tableLayout?.getChildAt(i) as TableRow).getChildAt(j) as TextView
                cell.text = ""
                if(setClickListener){
                    cell.setOnClickListener(object: View.OnClickListener{
                        override fun onClick(v: View?){
                            cellClickListener(i,j)
                        }
                    })
                }
            }
        }
    }

    private fun cellClickListener(row:Int,column:Int){
        gameBoard[row][column]= turn
        ((tableLayout?.getChildAt(row) as TableRow).getChildAt(column) as TextView).text = turn.toString()
        turn = if('X'==turn) 'O' else 'X'
        turnTextView?.text = String.format(resources.getString(R.string.turn),turn)
    }
}
