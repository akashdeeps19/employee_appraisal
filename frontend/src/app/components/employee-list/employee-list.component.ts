import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  
  Employee:any = [];
  chart:any

  constructor(private apiService: ApiService) { 
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }

  showChart(id) {
    let data = [];
    let labels = ['skills', 'peerRating', 'workDone', 'customerRating', 'quality'];
    labels.forEach((e)=>data.push(this.Employee[id][e]));
    this.chart = new Chart(`lineCharts-${id}`, {
      type: 'bar',
      data: {
      labels: ['skills', 'peerRating', 'workDone', 'customerRating', 'quality'], // your labels array
      datasets: [
        {
          label: '# rating',
          data: data,
          backgroundColor: [
           'rgba(54, 162, 235, 1)',
           'rgba(255, 99, 132, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(230, 25, 75, 1)',
           'rgba(60, 180, 75, 1)',
           'rgba(245, 130, 48, 1)',
           'rgba(145, 30, 180, 1)',
           'rgba(210, 245, 60, 1)',
           'rgba(0, 128, 128, 1)',
           'rgba(128, 0, 0, 1)'
          ],
          fill:true,
          lineTension:0.2,
          borderWidth: 1
        }
      ]
      },
      options: {
        responsive: true,
        title: {
          text:"Employee Performance",
          display:true
        },
        scales: {
          yAxes:[{
            ticks:{
              beginAtZero:true,
              max:5
            }
          }]
        }
      }
    });
  }

}