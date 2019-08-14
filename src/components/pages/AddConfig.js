import React, { useState, createContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Save from '../buttons/Save'
import Play from '../buttons/Play'
import ConfigTable from '../pages/ConfigTable'
import TextField from '@material-ui/core/TextField'
import { serverHost } from '../../api/config'
import { getConfigList } from '../../api/rest'

export const AddConfigContext = createContext(null)

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  toolbarButtons: {
    marginLeft: 'auto',
    marginRight: -15,
    display: 'flex',
    flexDirection: 'row'
  },
  textField: {
    marginBottom: '17px',
    width: 200
  }
}))

export default function AddConfig({
  transition,
  configList,
  setConfigList,
  open,
  setOpen,
  defaultName = '',
  defaultData = []
}) {
  const classes = useStyles()
  const typeLookupMap = { 0: 'float', 1: 'integer', 2: 'boolean', 3: 'string' }
  let title = (
    <TextField
      id="standard"
      className={classes.textField}
      onChange={changeConfigName}
    />
  )

  const [name, setName] = useState(defaultName)

  const [data, setData] = useState(defaultData)

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    {
      title: 'Type',
      field: 'type',
      lookup: typeLookupMap
    },
    { title: 'Value', field: 'value' }
  ])

  function isInt(n) {
    return Number(n) === n && n % 1 === 0
  }

  function isFloat(n) {
    return Number(n) === n && n % 1 !== 0
  }

  function getValueType(value) {
    if (isInt(value)) {
      return getKeyByValue(typeLookupMap, 'integer')
    } else if (isFloat(value)) {
      return getKeyByValue(typeLookupMap, 'float')
    } else if (typeof value === 'boolean') {
      return getKeyByValue(typeLookupMap, 'boolean')
    } else {
      return getKeyByValue(typeLookupMap, 'string')
    }
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  function convertResponse(data) {
    let respData = []
    delete data['success']
    delete data['name']
    Object.keys(data).map(function(keyName, keyIndex) {
      let row = {}
      row['name'] = keyName
      row['value'] = data[keyName]
      row['type'] = getValueType(data[keyName])
      respData.push(row)
    })
    return respData
  }

  if (name !== '' && Object.keys(data).length === 0) {
    // state.name = name;
    // state.data = convertResponse(data);
    title = (
      <TextField
        id="standard"
        className={classes.textField}
        onChange={changeConfigName}
        value={name}
      />
    )
  }

  function changeConfigName(e) {
    setName(e.target.value)
    // state.name = e.target.value
    // console.log(state.name)
  }

  function convertTable(data) {
    let jsonData = {}
    Object.values(data).forEach(function(hyp) {
      let t = getValueType(hyp['value'])
      if (typeLookupMap[t] === 'float' || typeLookupMap[t] === 'integer') {
        jsonData[hyp['name']] = parseFloat(hyp['value'])
      } else {
        jsonData[hyp['name']] = hyp['value']
      }
    })
    return jsonData
  }

  async function handleClose() {
    const configListData = await getConfigList()
    setConfigList(configListData.configList)
    setOpen(false)
  }

  async function handleSave() {
    console.log(data);
    const saveData = convertTable(data)

    saveData.name = name
    console.log(saveData);

    if (configList.includes(name)) {
      alert('This configuration name already exists. Please rename it.')
    } else if (name === '') {
      alert(
        'Configuration file name is empty. Please name your configuration file.'
      )
    } else {
      const resultResponse = await fetch(`${serverHost}/create-config`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveData)
      })

      const result = resultResponse.json()

      console.log(result)
      handleClose()
    }
  }

  return (
    <AddConfigContext.Provider value={{ setData }}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <div className={classes.toolbarButtons}>
              <Play />
              <Save handleSave={handleSave} />
            </div>
          </Toolbar>
        </AppBar>
        <ConfigTable
          defaultData={defaultData}
          columns={columns}
          typeLookupMap={typeLookupMap}
          title={title}
        />
      </Dialog>
    </AddConfigContext.Provider>
  )
}
