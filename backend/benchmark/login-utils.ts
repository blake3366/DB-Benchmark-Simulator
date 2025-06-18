import _ from 'lodash';


export const getRandomEmails = ((conut=10, total=100)=>{
    const random_number = _.sampleSize(_.range(1, total), conut); 
    const emails = random_number.map(value => `user${value}@example.com`);
    console.log(`🔵 [${emails}] 模擬登入流程開始`);
    return emails;
})

export const inputPassword = '123456';
