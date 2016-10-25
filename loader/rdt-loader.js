var source_reg = /\[.*\]/g
var scope_reg = /\(.*\)/g
module.exports = function(source, map) {

  function getProps(props) {
    var mapProps = props.split(',')
    var PropsObj = {}
    mapProps.forEach(function(p) {
      switch(p.split(':')[1]) {
        case 'string':
          Object.assign(PropsObj, { [p.split(':')[0]]: 'React.PropTypes.string' })
          break;
      }
    })
    return PropsObj
  }

  function getState(state) {
    var mapState = state.split(',')
    var StateObj = {}
    mapState.forEach(function(s) {
      Object.assign(StateObj, { [s.split('=')[0]]: s.split('=')[1].replace(/\'/g, '') })
    })
    return StateObj
  }

  source = source.match(source_reg)
  var default_options = ['Name', 'State', 'Props', 'Render']
  var setting = {}
  source.forEach(function(key) {
    var set = default_options.filter(function(option) {
      if (~key.indexOf(option)) {
        setting[option.toLowerCase()] = key.match(scope_reg)[0].split('(')[1].split(')')[0]
      }
    })
  })
  return `
    const ${setting.name} = React.createClass({
      propTypes: ${JSON.stringify(getProps(setting.props), null, 4)},
      getInitialState () {
        return ${JSON.stringify(getState(setting.state), null, 4)}
      },
      render() {
        return ${setting.render}
      }
    })
    module.exports = ${setting.name}
  `
}
