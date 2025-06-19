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