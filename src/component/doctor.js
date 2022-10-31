import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import DisplayRecord from './displayRecord';
//import './doctor.css';
 
 class Doctor extends React.Component{

	   
        txtContactNoKeyTyped(){
            
             let contactNo=this.refs.contactNo.value;
             
            console.log(this.refs.contactNo);
            if(contactNo.length<10){
              console.log('Entered Conatact number is not valid');
              //this.refs.contactNo.value=null;
              //ReactDOM.findDOMNode(this.refs.contactNo).focus()
 
            }
         }
        btnNewActionPerformed(){
            this.reset();
            
           }
           reset(){
               this.refs.id.value="";
               this.refs.name.value="";
               this.refs.fatherName.value="";
               this.refs.address.value="";
               this.refs.contactNo.value="";
               this.refs.email.value="";
               this.refs.qualification.value="";
               this.refs.specialization.value="";
               this.refs.gender.value="";
               this.refs.bloodGroup.value="";
               this.refs.doj.value=""
           }
        btnSaveActionPerformed(){
            //TODO ===validate call to check field
            console.log('calling validate');
            
            let jsonReq={
                id:this.refs.id.value,
                name:this.refs.name.value,
                fatherName:this.refs.fatherName.value,
                address:this.refs.address.value,
                contactNo:this.refs.contactNo.value,
                email:this.refs.email.value,
                qualification:this.refs.qualification.value,
                specialization:this.refs.specialization.value,
                gender:this.refs.gender.value, 
                bloodGroup:this.refs.bloodGroup.value,
                doj:this.refs.doj.value,
            }
           
            if(!this.validate()){
               return;
            }
            //make a API call to save data
             //let jsonstr=JSON.stringify(jsonReq);
             this.props.btnSaveActionPerformed(jsonReq,this);
             
        }
        validate(){
           
            if((!this.refs.id.value)||(this.refs.id.value===""))
                {
                    alert('Id is mandatory');
                    return false;
                }
            if((!this.refs.name.value)||(this.refs.name.value==="")){
                alert('Name is mandatory');
                return false;
            }
            if((!this.refs.fatherName.value)||(this.refs.fatherName.value==="")){
                alert('FatherName is mandatory');
                return false;
            }
            if((!this.refs.address.value)||(this.refs.address.value==="")){
                alert('Address is mandatory');
                return false;
            }
            if((!this.refs.contactNo.value)||(this.refs.contactNo.value==="")){
                alert('ContactNo is mandatory');
                return false;
            }
            if(this.refs.contactNo.value.length!==10){
               alert('Contact number not valid! Enter 10 digit');
               return false;
            }
            if((!this.refs.email.value)||(this.refs.email.value==="")){
                alert('Email is mandatory');
                return false;
            }
            if((!this.refs.qualification.value)||(this.refs.qualification.value==="")){
                alert('Qualification is mandatory');
                return false;
            }
            if((!this.refs.specialization.value)||(this.refs.specialization.value==="")){
                alert('Specialization is mandatory');
                return false;
            }
            if((!this.refs.gender.value)||(this.refs.gender.value==="")){
                alert('Gender is mandatory');
                return false;
            }
            if((!this.refs.bloodGroup.value)||(this.refs.bloodGroup.value==="")){
                alert('BloodGroup is mandatory');
                return false;
            }
            if((!this.refs.doj.value)||(this.refs.doj.value==="")){
                alert('DOJ is mandatory');
                return false;
            }
           return true;
        }
        btnDeleteActionPerformed(){
           if(this.refs.id.value){
            this.props.btnDeleteActionPerformed(this);

           }
           else{
               alert("please entered id");
           }
           //this.reset;
        }
        btnUpdateActionPerformed(){
            
            let jsonReq={
                id:this.refs.id.value,
                name:this.refs.name.value,
                fatherName:this.refs.fatherName.value,
                address:this.refs.address.value,
                contactNo:this.refs.contactNo.value,
                email:this.refs.email.value,
                qualification:this.refs.qualification.value,
                specialization:this.refs.specialization.value,
                gender:this.refs.gender.value,
                bloodGroup:this.refs.bloodGroup.value,
                doj:this.refs.doj.value
            }
            if(!this.validate()){
                return;
            }
            let jsonstr=JSON.stringify(jsonReq);
            console.log(jsonstr);
            this.props.btnUpdateActionPerformed(jsonReq,this);
        }
      
       

        render(){
            return this.initComponents();
            
        }
	    
	    
 }

 const mapStateToProps=(state)=>{
    return{
        doctor:state.doctor
    };
};
const mapDispatchToProps=(dispatch)=>{
    return {
        
        jButton1ActionPerformed:()=>{
                 console.log("get doc record from server");
                 //need to call new component and in that component it will show all the doctor record in tabular form
             axios.get("http://localhost:6060/getdata")
             .then((response)=>{
                 console.log(response.data);




                 dispatch({
                    type:"GET_RECORD",
                    payload:{doctorRecord:response.data}
                });

             })
             .catch((err)=>{
                 console.log("error :"+err);
             })
                 
        },
        btnSaveActionPerformed:(jsonReq,thisRef)=>{
            console.log("new record saving");
            //let jsonstr=JSON.stringify(jsonReq);
           // const config = { headers: { 'Content-Type': 'multipart/form-data'} };
            
            axios.post('http://localhost:6060/save',jsonReq,{headers: {
                "Content-Type": "application/json"}
            })
            
            // axios({url:'http://localhost:8080/hms/rest/save',
            //      data:jsonReq,
            //      method:"post",
            //      responseType:"json"})
            .then((response)=>{
              
              if(response.data.status==="success"){
                alert("New Doctor record saved for Id :"+thisRef.refs.id.value);
                thisRef.reset();
              }
              else{
                 alert("Doctor record is already aviable with id :"+thisRef.refs.id.value);
              }              
                dispatch({
                    type:"SAVE_RECORD",
                    payload:{doctorRecord:response.data}
                });
            })
            .catch((err)=>{
               console.log("error while saving doctor data : "+err);
            });
        },
        btnDeleteActionPerformed:(thisRef)=>{
            let url="http://localhost:6060/delete?id="+thisRef.refs.id.value;
            axios.get(url)
            .then((response)=>{
                if(response.data.status==="success"){
                    alert("Doctor record deleted for id : "+thisRef.refs.id.value);
                    
                  }
                  else{
                     alert("Doctor record is not aviable for Id : "+thisRef.refs.id.value);
                  }
                
                dispatch({
                    type:"DELETE_RECORD",
                    payload:{doctorRecord:response.data}
                });

            })
            .catch((err)=>{
                console.log("error :"+err);
            })
        },
        btnUpdateActionPerformed:(jsonReq,thisRef)=>{
            console.log("record has been updated: "+jsonReq);
            //let jsonstr=JSON.stringify(jsonReq);
            
            axios.post('http://localhost:6060/update',jsonReq,{headers: {
                "Content-Type": "application/json"}
            })
            .then((response)=>{
              console.log(response.data);
              if(response.data.status==="success"){
                alert("Doctor record updated for Id : "+thisRef.refs.id.value);
                thisRef.reset();
              }
              else{
                 alert("Doctor record not avilable for Id : "+thisRef.refs.id.value);
              }
              
                dispatch({
                    type:"UPDATE_RECORD",
                    payload:{doctorRecord:response.data}
                });
            })
            .catch((err)=>{
               console.log("error while saving doctor data : "+err);
            });
        }


    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Doctor);