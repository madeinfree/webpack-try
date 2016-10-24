module.exports = function(source, map) {
  var accept = 'accept'
  return 'var myAccept = ' + JSON.stringify(accept) + ';'
}
