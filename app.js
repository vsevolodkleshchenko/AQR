const express = require('express')
const upload = require('express-fileupload')
const { exec } = require('child_process');

const app = express()
const upload_path = 'uploads'
const download_path = 'downloads'

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/ITMO_en.png', (req, res) => {
    res.sendFile(__dirname + '/ITMO_en.png')
})
app.get('/coding-club.png', (req, res) => {
    res.sendFile(__dirname + '/coding-club.png')
})
function saveFile(req) {
    const file = req.files.file
    const file_ext = file.name.slice(-4,file.name.length)
    const filename = file.md5+file_ext
    file.mv('./'+upload_path+'/'+filename)
    return filename
}

function sendProcessedFile(res, filename) {
    const filepath = upload_path+'/'+filename
    const out_filename = filename.slice(0,-4)+'.png'
    let result = exec('python read_qr.py '+'./'+filepath, (err, stdout, stderr) => {
        if (err) { console.error(err) }
        else {
            const userString = stdout.slice(0,-1)
            if (userString.includes('\n')
            ) {
                console.log('wrong file string')
                res.sendFile(__dirname + '/'+filepath);
                return
            }
            exec('amzqr "'+userString+ '" -l M -c -p ITMO_en.png -d '+download_path+' -n '+out_filename, (err, stdout, stderr) => {
                if (err) { console.error(err) }
                else {
                    console.log(`stdout:`, stdout);
                    setTimeout(()=>{
                        res.sendFile(__dirname + '/'+download_path+'/'+out_filename);
                    },300)
                }

            })
        }
    });
}

app.post('/', (req, res) => {
    if (req.files) {
        const filename = saveFile(req)
        sendProcessedFile(res, filename)
    }
})

app.listen(5000)
