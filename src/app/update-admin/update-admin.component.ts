import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})

export class UpdateAdminComponent implements OnInit {
  @Output() onAdminChange = new EventEmitter()
  adminDetails:any = {}
  editAdminStatus:boolean = false
profilePicture:string="https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png?f=webp&w=256"

constructor(private adminAPI:AdminService,private toaster:ToastrService){}
ngOnInit(): void {
  this.adminAPI.getAdminDetails().subscribe((res:any)=>{
    this.adminDetails = res
    if(res.profilePic){
      this.profilePicture = res.profilePic
    }
  })
}
editAdminBtn(){
  this.editAdminStatus = true
}
onCancel(){
  this.editAdminStatus=false
}

getFile(event:any){
  let file = event.target.files[0]
  let fr = new FileReader()
  fr.readAsDataURL(file)
  fr.onload = (event:any)=>{
    console.log(event.target.result);
    this.profilePicture = event.target.result
    this.adminDetails.profilePic = event.target.result
  }
}
editAdmin(){
  this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
    next:(res:any)=>{
      this.editAdminStatus = false
      this.toaster.success("Admin details updated Successfully")
      sessionStorage.setItem("adminDetails",JSON.stringify(res))
      this.onAdminChange.emit(res.name)
    },
    error:(reason:any)=>{
      this.toaster.warning("Updation failed...please try after sometieme!!!")
    }
  })
}

}
