
import { LightningElement, track, wire } from 'lwc';
import getTasks from '@salesforce/apex/todoListController.getTasks';
import {refreshApex} from '@salesforce/apex';
import addNewTask from '@salesforce/apex/todoListController.addNewTask';
import deleteTask from '@salesforce/apex/todoListController.deleteTask';
export default class TodoListComp extends LightningElement {

    addTask_var = '';

    processing = true;
    showError = false;

    @track
    taskArray = [];

    refreshTodoTask;

    @wire(getTasks)
    getTodoTasks(response){
        this.refreshTodoTask = response;
        let data = response.data;
        let error = response.error;

        if(data || error){
            this.processing = false;
        }
        if(data){
            console.log('Data '+this.taskArray.length);
            console.log(data);
            this.taskArray = [];
            data.forEach(task => {
                this.taskArray.push({
                    id: this.taskArray.length + 1,
                    name: task.Subject,
                    recordId: task.Id
                });
            });
        } else if(error){
            console.log('error ');
            console.log(error);
        }
        console.log('array-->'+JSON.stringify(this.taskArray));
    }

 //  @track taskArray = [];
   

    handleTask(event){
      //  console.log('Task Name:-'+event.target.value);
        this.addTask_var = event.target.value;
        this.showError = false;

    }

    handleClick(event){

        if(this.addTask_var == ''){
            this.showError = true;
            return ;
        } else {


        this.processing = true;
        console.log('button click');
// as line no 73 this code will getting error when array is empty so we will use conditional oprator
      
       addNewTask({TaskName: this.addTask_var})
        .then(result => {
            console.log(' result '+JSON.stringify(result));

            this.taskArray.push({
                id: this.taskArray[this.taskArray.length - 1] ? this.taskArray[this.taskArray.length - 1].id + 1 : 0,
                name: this.addTask_var,
                recordId: result.Id
            });
            this.addTask_var = '';
         //   this.processing = false;
        })
        .catch(error => console.log('Error '+error))

        // as this.processing = false; line is common in both then and catch block so in order to reduce the code we can use finally block 
        // instead of using two times 
        .finally(() => this.processing = false);

        
        console.log('Updated Task List '+JSON.stringify(this.taskArray));

    }
        /*
        this.taskArray.unshift({
            Id: this.taskArray.length + 1,
            name: this.addTask_var
        });
        */
        
       
        
      //  console.log(this.taskArray);
     //   this.addTask_var = '';
        
       
    }

    refreshTodoList(){

        this.processing = true;
        refreshApex(this.refreshTodoTask)
        .finally(() => this.processing = false);
        this.showError = false;
    }

    handleDeleteIcon(event){

        let taskToDelete = event.target.name;
        let taskArray = this.taskArray;
        let taskIndex;
        let recIdToDelete;
        this.processing = true;

        for(let i=0; i<taskArray.length; i++){

            if(taskToDelete === taskArray[i].id){
                this.taskIndex = i;
            }
        }
        console.log('Delete Index-->'+this.taskIndex);
        this.recIdToDelete = this.taskArray[this.taskIndex].recordId;
        
        console.log('Id To Delete '+this.recIdToDelete);
        deleteTask({recId:this.recIdToDelete})
        .then(result => {
            console.log('Delete Rec--> '+result);

        this.taskArray.splice(this.taskIndex, 1);
       
        console.log('Task Array--->'+JSON.stringify(this.taskArray));

        })
        .catch(error => console.log('Error -> '+error))

         // as this.processing = false; line is common in both then and catch block so in order to reduce the code we can use finally block 
        // instead of using two times 

        .finally(() => this.processing = false);
       
    }
/*
        let taskToDelete = event.target.name;
        let taskArray = this.taskArray;
        let taskIndex;

        
        taskArray.splice(taskArray.findIndex(loopTask => loopTask.Id === taskToDelete), 1);
    }

     */   /*
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
