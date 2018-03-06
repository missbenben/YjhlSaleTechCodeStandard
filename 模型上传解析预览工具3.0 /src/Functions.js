/**
 * @date:2017/12/20 13:48
 * @author:liuyuan
 * @description:去除对象数组里已知的属性名称字段相同的对象
 * @params: { objectArray } :对象数组，比如 [{name:'Taylor',age:22},{name:}]
 * @params:
 * @return:
 * @example:  [{name:"羽根",artist:"air"},{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"},{name:"晴天",artist:"周杰伦"},{artist:"周杰伦",name:"晴天"}]  =>  [{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]

 */
export const removeRepeated =(objectArray) =>{

        let result = {};
        let finalResult=[];
        for(let i=0;i<objectArray.length;i++){
            result[objectArray[i].name]=objectArray[i];
            //因为objectArray[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
        }
        //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
        for(let item in result){
            finalResult.push(result[item]);
        }
        //console.log(finalResult);[{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]
        return finalResult;
}