import { LightningElement, track } from 'lwc';

export default class Hello_World_Comp extends LightningElement {

    inputText = '';

   handleChange(event){
       console.log('Text Value is:'+event.target.value);
    this.inputText = event.target.value;
   }
}
