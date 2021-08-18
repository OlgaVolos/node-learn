const fs = require('fs');
const path = require('path')

const pathToFemaleDir = path.join(__dirname, '1800');
const pathToMaleDir = path.join(__dirname, "2000");


fs.readdir(pathToFemaleDir, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(file => {
        console.log(file);
//покаже всі файли в даній папці.
// Далі, щоб їх перебрати, нам треба доступитися
// до інформації кожного файлу в межах forEach
        const pathToFile = path.join(pathToFemaleDir, file);
        fs.readFile(pathToFile, (err1, data) =>{
            if(err1){
                console.log(err1);
                return;
            }
            console.log(data.toString());
// виведе інформацію, яка знаходиться в кожному файлику,
// які тепер можна посортувати. Не забувати, що ми все ще в forEach!!!!
            const person = JSON.parse(data.toString())
            console.log(person);
            if(person.gender === "male"){
                const oldPath = path.join(pathToFemaleDir, file);
                const newPath = path.join(pathToMaleDir, file);
                fs.rename(oldPath, newPath, err2 => {
                    if(err2){
                        console.log(err2);
                        return
                    }
                    console.log('done')
                })
            }
        })

    })
})

// перевіряємо:

fs.readdir(pathToFemaleDir,  (err, files) => {
    if(err){
        console.log(err);
        return;
    }
    files.forEach(file => {
        console.log(file);
    })
})

// тепер те ж саме навпаки:
fs.readdir(pathToMaleDir, (err, files) => {
    if(err){
        console.log(err);
        return;
    }
    files.forEach(file => {
        fs.readFile(path.join(pathToMaleDir, file), (err1, data) => {
            if(err1){
                console.log(err1);
                return;
            }
            console.log(data.toString());
            const person = JSON.parse(data.toString());
            if(person.gender === "female"){
                const oldPath = path.join(pathToMaleDir, file);
                const newPath = path.join(pathToFemaleDir, file);
                fs.rename(oldPath, newPath, err2 => {
                    if(err2){
                        console.log(err2);
                        return;
                    }
                    console.log("done")
                })
            }

        })
    })
})

