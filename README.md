






  SBA308 : 

  this program is to analyze and transform the data of learner's submissions presented as array of Object 
  with a help of assignment array containing object reflecting assignment detail information for each assignment - possible points ,   
  into a result array containing objects , each object represents the learner id , his average score for 
  each assignment and total final average across from all his assignments.   



*********************** Output **************************************
Melisas-MBP-3:SH_SBA308 admin$ node index.js                              * 
learner 22 : Assignment 13 was past due ,10 % is deducted from the        * assignment                                                                *
learner 19 : Assignment 13 was past due ,10 % is deducted from the        * assignment                                                                *
learner 17 has submitted the assignment 14 on 09/20/2023 which is too     * early, the due date is :                                                  *
                           09/22/2023                                     *
[                                                                         *
  {       
    id: 17,
    'Assign 10': 0.94,
    'Assign 11': 0.95,
    'Assign 12': 0.75,
    avg: 0.88
  },
  {
    id: 19,
    'Assign 10': 0.99,
    'Assign 12': 0.72,
    'Assign 13': 0.648,
    avg: 0.79
  },
  {
    id: 22,
    'Assign 11': 0.89,
    'Assign 14': 0.8,
    'Assign 13': 0.621,
    avg: 0.77
  }
]
Melisas-MBP-3:SH_SBA308 admin$ 
*******************************************************************