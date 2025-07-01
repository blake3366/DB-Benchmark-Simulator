import _ from 'lodash';
import { createClient } from 'redis';

export const inputPassword = '123456';

export const getRandomEmails = ((conut=10, total=100)=>{
    const random_number = _.sampleSize(_.range(1, total), conut); 
    const emails = random_number.map(value => `user${value}@example.com`);
    console.log(`🔵 [${emails}] 模擬登入流程開始`);
    return emails;
})
export const redis = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379' ,
  });
  
let isRedisConnected = false;
export async function connectRedisInit() {
    if (!isRedisConnected) {
      await redis.connect();
      isRedisConnected = true;
      console.log('✅ Redis connected');
    }
}
export const meanFunction = (array: number[]) => {
    if (array.length === 0) return 0; // null array check
    const sum = array.reduce((acc, value) => acc + value, 0);
    const mean = sum / array.length;
    return mean;
}

export const varianceFunction = (array: number[]) => {
    if (array.length === 0) return 0;
    const mean = meanFunction(array);
    const length = array.length;
    const variance = array.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / length;
    return variance;
}