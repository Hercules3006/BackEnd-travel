import mongoose from 'mongoose';

const connect = async() => {
    try {
        await mongoose.connect('mongodb+srv://thangngodan:oqBJQT69MWpcR5Vd@cluster0.laicnbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"', {
            dbName: "Travel",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed', error);
    }
}

export default connect;