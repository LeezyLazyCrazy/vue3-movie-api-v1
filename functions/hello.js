exports.handler = async function (event, context){
  return{
    statusCode: 200,
    body: JSON.stringify({
      name:'LEEZY',
      age: 100,
      email: 'leeg1dance@gmail.com'
    })
  }
}