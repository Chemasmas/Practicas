package com.chemasmas.locationalarm

import android.app.Activity
import android.content.Context
import android.os.Bundle
import android.view.View
import android.widget.Toast
import kotlinx.android.synthetic.main.settings.*


class SettingsActivity : Activity() {

    private var AlarmLat : Double = 0.0
    private var AlarmLong : Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.settings)

        val sharedPref = this?.getSharedPreferences( getString(R.string.PREFS_NAME) , Context.MODE_PRIVATE ) ?: return

        AlarmLat =
            java.lang.Double.parseDouble(sharedPref.getString("userLat",
                "13.07975"))
        AlarmLong =
            java.lang.Double.parseDouble(sharedPref.getString("userLang",
                "80.1798347"))


    }

    fun onClickButton(view: View){
        val sharedPref = this?.getSharedPreferences( getString(R.string.PREFS_NAME) , Context.MODE_PRIVATE ) ?: return
        with( sharedPref.edit()){
            putString("userLat",latText.text.toString() )
            putString("userLong",langText.text.toString() )
            commit()
        }
        Toast.makeText(this,"Alarm Set",Toast.LENGTH_LONG).show()
    }


}
