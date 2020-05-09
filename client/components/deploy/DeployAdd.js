import React,{ useState, useEffect, useReducer  } from "react"; 
import { useForm } from "react-hook-form";
import  axios  from 'axios';
import DeployList from './DeployList'; 
// import Select from 'react-select'
import {Form } from 'react-bootstrap'
import {Button} from 'react-bootstrap';
import {Alert} from 'react-bootstrap';


const DeployAdd = (props) =>{
  const { register, handleSubmit,reset, watch, errors } = useForm();
  const initialState = []
  const [deploy, setDeploy] = useState(initialState) 
  const initialFormState = { url: '', templateName: '',version:'' }
  const [ createdeploy, setCreateDeploy ] = useState(initialFormState)
  const POPULATE = 'populate'
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('')
const data = [
  {
    "name": "Natural One",
    "versions": [
      "1.0.0",
      "1.0.1",
      "1.1.0",
      "2.0.0"
    ]
  },
  {
    "name": "Techno 01",
    "versions": [
      "1.0.0",
      "1.1.1",
      "2.0.1"
    ]
  },
  {
    "name": "Sporty",
    "versions": [
      "1.0.0",
      "1.1.0",
      "1.2.0",
      "1.2.1",
      "1.3.0",
      "2.0.0"
    ]
  }
]



const initialData = {
  versionsToBeLoaded: [],
  isOptionDisable:false
}

const [templatedata, dispatch] = useReducer(reducer, initialData)


useEffect(
  () => {
 const getDeploys = async () => {
    try {
      const response = await axios.get("/api/deploys");
      setDeploy(response.data);
    } catch(error) {
      console.log('error', error);
    }
  }
    getDeploys();
  },
  [ deploy ]
)

function reducer(templatedata, action){
  if(action.type == "populate"){
    return {
      ...templatedata,
      isOptionDisable:true,
      versionsToBeLoaded: data.find(
        name => name.name === action.name
      ).versions
  }
}else{
  return initialData
}
  
}



  const handleChange=(event) => { 
    if(!event.target.value) return
    if(event.target.name === 'templateName'){
      dispatch({ type: POPULATE, name: event.target.value })
    }     
    setCreateDeploy({...createdeploy, [event.target.name]: event.target.value})   
  }

  const formSubmit = (event) =>{  
    if(!createdeploy.url || !createdeploy.templateName || !createdeploy.version ) return 
    setCreateDeploy({...createdeploy,initialFormState})
    reset()
    const postDeploy= async () => {
      try {
        const response = await axios.post('/api/deploys', createdeploy);
        if(response.data.id){
          createdeploy._id=response.data.id
          setDeploy([ ...deploy, createdeploy ])
          setShow(true)
          setMessage('Created Successfully')
        }else{
          setShow(true)
          setMessage('Something went Wrong')
        }
      } catch(error) {
        console.log('error', error);
      }
    }
    postDeploy();
  }


  return ( 
    <div>
      <h1>Create Deploy</h1>

      <div className="form-wrapper">
      <Form onSubmit={handleSubmit(formSubmit)} >
      <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Template Name</Form.Label>
    <Form.Control as="select" custom ref={register({  })}  name="templateName" value={deploy.templateName}  onChange={handleChange}>
    <option disabled={templatedata.isOptionDisable}>Select Template</option>{data.map((x,y) => <option key={y} value={x.name}>{x.name}</option>)}
    </Form.Control>
  </Form.Group>

  <Form.Group controlId="exampleForm.SelectCustom1">
    <Form.Label>Version</Form.Label>
    <Form.Control as="select" custom ref={register({ })}  name="version" value={deploy.version}  onChange={handleChange}>
    <option  disabled={templatedata.isOptionDisable}>Select Version</option>{templatedata.versionsToBeLoaded.map((x,y) => <option key={y} value={x}>{x}</option>)}
    </Form.Control>
  </Form.Group>

        <Form.Group controlId="url">
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" ref={register({pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, required: true })} name="url" value={deploy.url} onChange={handleChange} />
          {errors.url && <span>*Invalid Url</span>}
        </Form.Group>

        <Button variant="primary" size="lg" block="block" type="submit" value="Submit" >
          Create Deploy
        </Button>
      </Form>
      {show &&
      <Alert variant="info" onClose={() => setShow(false)} dismissible>
        <p>
          {message}
        </p>
      </Alert>
    } 
    </div>
    
    <div>
    <h1>Deploy List</h1>
    <DeployList deploys={deploy} />
    </div>      
    </div>
  );
}

export default DeployAdd;