const express = require('express')
const upload = require('express-fileupload')
const qr_module = require('qrcode-decoder')

const app = express()

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/'+file.md5+'.png', function (err) {
            if(err) {
                res.send(err)
            } else {
                var filepath = '/uploads/'+file.md5+'.png'
                res.sendFile(__dirname + filepath);
                
            }
        })
        
  	
  	console.log(qr_module)   
  	var qr = new qr_module.QrcodeDecoder();   
               	QrcodeDecoder     
//	user_string = get_string_from_userQR(__dirname + filepath)
        
        
        
        const { exec } = require('child_process');
	exec('amzqr'+user_string+ '-c -p ITMO_en.png', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});
        console.log('second try', filename)
    }
})

app.listen(5000)
