const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect(process.env.DB_CONNECT,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connect Successful !!');
//     } catch (error) {
//         console.log('Connect Failed !!');
//     }
// }

// module.exports = { connect };

class ConnectSingleton {
    getInstance(){
        if (!ConnectSingleton.instance){
            ConnectSingleton.instance = new ConnectSingleton
        }
        return ConnectSingleton.instance
    }

    sayHi() {
        console.log('hi con cac')
    }

    async connect() {
        try {
            await mongoose.connect(process.env.DB_CONNECT,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connect Successful !!');
        } catch (error) {
            console.log('Connect Failed !!');
        }
    }
}

module.exports = new ConnectSingleton


