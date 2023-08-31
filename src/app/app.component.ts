import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud';
  positionID = '';
  positionName = '';
  positionType = '';
  empDetails: any = [];

  selectInd = '';
  submitButton=true;
  


  constructor(private httpClient:HttpClient) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.read()
  }
  read(){
    this.httpClient.get('https://hrms-dev-server.herokuapp.com/api/position/').subscribe(
      (response:any)=>{
        this.empDetails=response.data;
        console.log('response',response.data);
      }
     )

  } 
  submit() {
    let details = {
      positionID: this.positionID,
      positionName: this.positionName,
      positionType: this.positionType
    }
    this.httpClient.post('https://hrms-dev-server.herokuapp.com/api/position/',details).subscribe(
      (response: any) => {
        console.log('update', response);
        this.read();
        this.clear();
        
      }

    )
    this.empDetails.push(details)
    this.clear();
  }
  delete(_id: any) {

    // this.empDetails.splice(i, 1);
    this.httpClient.delete('https://hrms-dev-server.herokuapp.com/api/position/' + _id).subscribe(
      (response: any) => {
        console.log('Delete', response);
        this.read();
       
        
      }
    )
  }
  edit(_id: any) {
    this.submitButton=false;
    this.selectInd = _id;
    this.positionID = this.empDetails[_id].positionID;
    this.positionName = this.empDetails[_id].positionName;
    this.positionType = this.empDetails[_id].positionType;

  }
  update() {
   
    this.submitButton=true;
    let id = this.empDetails[this.selectInd]._id;
    console.log('id', id);
    let list = {
      positionID: this.positionID,
      positionName: this.positionName,
      positionType: this.positionType
    }

    this.httpClient.put('https://hrms-dev-server.herokuapp.com/api/position/' + id , list).subscribe(
      (response: any) => {
        console.log('update', response);
        this.read();
        this.clear();
      }

    )
    // this.empDetails[this.selectInd].positionID = this.positionID;
    // this.empDetails[this.selectInd].positionName=this.positionName;
    // this.empDetails[this.selectInd].positionType=this.positionType;
    // this.clear()
  }
  clear() {
    this.positionID = " ";
    this.positionName = " ";
    this.positionType = " ";

  }
}
