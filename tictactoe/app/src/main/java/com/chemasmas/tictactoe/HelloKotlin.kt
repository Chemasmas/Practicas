package com.chemasmas.tictactoe

import android.support.design.widget.Snackbar
import android.view.View

class HelloKotlin (private var message:String) {

    constructor():this("Hello Kotlin")

    fun displayMessage(view: View) {
        Snackbar.make(view,message,Snackbar.LENGTH_LONG).setAction("Action",null).show()
    }
}

data class Game(var gameBoard: Array<CharArray>, var winner: Char)