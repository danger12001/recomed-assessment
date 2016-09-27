var fs = require('fs');
exports.repos = function(){

var GitHubApi = require('github');
var github = new GitHubApi({
    // optional args
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    headers: {

    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});
github.authenticate({
    type: "basic",
    username: 'danger12001',
    password: '5550121a'
});
var list = [];
github.repos.getAll({},function(err, res){
  // console.log(JSON.stringify(res));
  data = JSON.stringify(res);
  // data.replace(/]/g, '');
  var repos = data.split('},{');

  repos[0] = repos[0].replace(/\[/g, '');
  repos[repos.length - 1] = repos[repos.length - 1].replace(/]/g, '');
  repos[repos.length - 1] = repos[repos.length - 1].slice(0, - 1);
  // repos[repos.length - 1] = repos[repos.length - 1] + '}';
  for(var x = 0; x < repos.length;x ++){
    // console.log(repos[repos.length - 1]);
  repos[x] = repos[x] + '}';

  if(x !== 0){
  repos[x] = '{' + repos[x];
  }
// console.log(repos[x]);
    list.push(JSON.parse(repos[x]));
  }
  fs.writeFileSync('./public/data/data.JSON',JSON.stringify(list));
  // console.log(repos[repos.length -1]);
  // console.log(repos.length);
  // console.log('length: ', list[0].id);
  // return repos;
});
// console.log(repositories);

// console.log('data: ', repositories);
return list;
};
