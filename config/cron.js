module.exports.cron = {
    myFirstJob: {
      schedule: '00 30 08 * * *',
      onTick: function () {
        var user_message = { 
            app_id:sails.config.custom.onesignal_user_id ,
            key:sails.config.custom.onesignal_user_key,
            contents: {"en": 'Good Morning'},
            headings: {"en":"Greeting from BAHARAMPUR ONE TOUCH"},
            included_segments: ["All"],
            small_icon:'http://139.59.12.86:3001/icon.png',
            large_icon:'http://139.59.12.86:3001/cook.png',
            android_sound:'sound.mp3',
            android_led_color:'FF0000',
             type:'user'
          };
      console.log('====================================')
      console.log(user_message)
      console.log('====================================')
        
      pushServices.pushFire(user_message);

      },
      timezone: 'Asia/Kolkata'

    }
  };