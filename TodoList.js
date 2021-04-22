
import { LightningElement, track } from 'lwc';

export default class TodoListComp extends LightningElement {

    addTask_var = '';

   @track taskArray = [];
   

    handleTask(event){
      //  console.log('Task Name:-'+event.target.value);
        this.addTask_var = event.target.value;

    }

    handleClick(event){

        console.log('button click');
        /*
        this.taskArray.unshift({
            Id: this.taskArray.length + 1,
            name: this.addTask_var
        });
        */
        
        this.taskArray.push({
            Id: this.taskArray.length + 1,
            name: this.addTask_var
        });
        
      //  console.log(this.taskArray);
        this.addTask_var = '';
        
       
    }

    handleDeleteIcon(event){
        console.log('click Delete'+event.target.name);

        let taskToDelete = event.target.name;
        let taskArray = this.taskArray;
        let taskIndex;

        
        taskArray.splice(taskArray.findIndex(loopTask => loopTask.Id === taskToDelete), 1);
    }

        /*
         //   method 2
        taskArray.splice(
            taskArray.findIndex(function(loopTask){

                return loopTask.Id === taskToDelete;
            })
            , 1
        );

        */
/*
// method 3
        for(let i=0; i<taskArray.length; i++){

            if(taskToDelete === taskArray[i].Id){
                taskIndex = i;
            }
        }
        console.log('Delete Index-->'+taskIndex);
        this.taskArray.splice(taskIndex, 1);
        console.log('Task Array--->'+JSON.stringify(this.taskArray));
    }
 */
    
}
