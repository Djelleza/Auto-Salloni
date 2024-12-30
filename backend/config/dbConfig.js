import dotenv from 'dotenv'; 
dotenv.config(); 

const dbConfig = {
    user: process.env.DB_USER,               
    password: process.env.DB_PASSWORD,       
    server: process.env.DB_SERVER,         
    database: process.env.DB_NAME,          
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',  
        trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true' 
    }
};

export default dbConfig; 
