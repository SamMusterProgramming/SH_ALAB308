


const courseInfo =
{
        "id":123,
        "name": "introduction to  React",       
}

const assignmentInfos = 
{
    "id": 40,
    "name": "ALAB308.5.5",
    "due_at": "10/07/2023",
    "points_possible": 250,
  }

 const assignmentGroup =
  {
          "id": 10,
          "name": "group 1",
          "course_id": 123,
          "group_weight": 20,
          "assignments": [
              {
                "id": 10,
                "name": "fundamentals of react",
                "due_at": "09/22/2023",
                "points_possible": 80,
              },
              {
                "id": 11,
                "name": "work with components",
                "due_at": "09/22/2023",
                "points_possible": 100,
              },
               {
                "id": 12,
                "name": "useState and useEffect funcs",
                "due_at": "09/22/2023",
                "points_possible": 140,
              },
              {
                "id": 13,
                "name": "UseContext and Reducer in React",
                "due_at": "09/22/2023",
                "points_possible": 160,
              },
              {
                "id": 14,
                "name": "SBA Project in React",
                "due_at": "09/22/2023",
                "points_possible": 200,
              }
            
          ]
      
  }
  




const learnerSubmissionArray = [
    {
       
        "learner_id": 17,
        "assignment_id": 10,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 75
        }
    },
    {
       
        "learner_id": 19,
        "assignment_id": 10,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 79
        }
    },
    {
       
        "learner_id": 17,
        "assignment_id": 11,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 95
        }
    },
    {
       
        "learner_id": 19,
        "assignment_id": 12,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 101
        }
    },
    {
       
        "learner_id": 17,
        "assignment_id": 12,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 105
        }
    },

    {
       
        "learner_id": 22,
        "assignment_id": 11,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 89
        }
    },
    {
       
        "learner_id": 22,
        "assignment_id": 14,
        "submission": {
          "submitted_at": "09/22/2023",
          "score": 160
        }
    },
    {
       
        "learner_id": 22,
        "assignment_id": 13,
        "submission": {
          "submitted_at": "09/25/2023", // late submission
          "score": 111
        }
    },
    {
       
        "learner_id": 19,
        "assignment_id": 13,
        "submission": {
          "submitted_at": "09/25/2023", // late submission
          "score": 115
        }
    },
    {
       
        "learner_id": 17,
        "assignment_id": 14,
        "submission": {
          "submitted_at": "09/20/2023", // early submission
          "score": 155
        }
    }

];

let learnerScore = 0 ;
let pointPossible = 0 ;
let result =[];

function getLearnerData(courseInfoObj, assignmentGroupObj, learnerSubmissions ) {
     
        try {
          if (!isCourseMatches(courseInfoObj.id , assignmentGroupObj.course_id)) throw new Error(`course in the assignment does't correspent to the course assigned to learner`)
    

          for(let learnerSubmission of learnerSubmissions) {
            //if(!isCourseMatches(assignmentGroupObj.assignments.id , learnerSubmission.assignment_id)) throw new Error(`Learner's submission does't match the Assignment`)  
            
            
            let assignment_id = learnerSubmission.assignment_id;
            let learner_id = learnerSubmission.learner_id;
            let submitted_at = learnerSubmission.submission.submitted_at
            let averageScore = 0;
            let learnerScore = learnerSubmission.submission.score;
            let comment = "no comment "
            let field = "Assign " + assignment_id ; // field key for assignment average score
            let assignmentObj = findAssignementById(assignmentGroupObj.assignments,assignment_id)
            let pointPossible = assignmentObj.points_possible;
            
            if(assignmentObj) { 
                
                if((!isDateFormatCorrect(assignmentObj.due_at)))  throw new Error('Date format provided is incorrect in')  

                if(isAssignmentDue(assignmentObj.due_at,submitted_at) === "isDue") {
                           
                            
                            if(!checkValueZero(pointPossible)) {
                                averageScore = CalculateAveragePercentage(learnerScore,pointPossible) ;  

                            } else throw new Error ( `point_possible in assignment id : ${assignmentObj.id} can't be zero`) 
                }else {
                      if(isAssignmentDue(assignmentObj.due_at,submitted_at) == "notYet"){
                           console.log(`learner ${learner_id} has submitted the assignment ${assignment_id} on ${submitted_at} which is too early, the due date is :
                           ${assignmentObj.due_at}`)
                           continue ;
                      }else {
                        if(!checkValueZero(pointPossible)) {
                           console.log(`learner ${learner_id} : Assignment ${assignment_id} was past due ,10 % is deducted from the assignment `)
                           averageScore = CalculateAveragePercentage(learnerScore,pointPossible);
                           averageScore = averageScore - averageScore * 0.1 // deduct 10% for late submission 
                        } else throw new Error ( `point_possible in assignment id : ${assignmentObj.id} can't be zero`) 
                         
                      }
                  }
                  updateResultList(result,learner_id,averageScore,field,comment)  
            }else {
                console.log("couldn't find the assignment")
                continue;
            } 

          }
            
        } catch (e) {
            console.error(e)
        }

}

const isCourseMatches = function (id , course_id) {
    return (id === course_id)
}
const checkLeanerAssignmentSubmission = (learnerAss_id,assignment_id) => {
     return (learnerAss_id === assignment_id)
}
function findAssignementById(assignments,id) {
   let assign ={};
   assignments.forEach(assignment => {
      if (assignment.id === id) assign = assignment
   });
   return assign ; 
}
function checkValueZero (value) {
    return (value == 0)
}
function CalculateAveragePercentage(x,y) {
  return Math.round ((x/y)*100)/100
}
function findLearnerById(learners,id) {
    let learnerArray =[];
    learners.forEach(lner => {
       if (learner.id === id) learnerArray.push(lner)
    });
    return learnerArray ; 
 }

const isDateFormatCorrect = (str) => {
    const date = new Date(str);
    return !isNaN(date.getTime());
}
function isAssignmentDue (assDueDateSTR,subDateSTR) {
    const dueDate = new Date(assDueDateSTR).getTime()
    const subDate = new Date(subDateSTR).getTime()
    if (dueDate > subDate) return "notYet";
    if (dueDate < subDate) return "pastDue";
    if(dueDate == subDate) return "isDue"
}

function updateResultList(resultArray,learner_id, scorePercent, key, feedback) {
   let find =false;
   resultArray.forEach((learner)=>{
     if (learner.id == learner_id) 
     {
       learner[key] = scorePercent;
    //    learner["comment"] = feedback
       find = true;
     }
   })
    if(!find) { 
      let obj = {
        "id" : learner_id,
        [key] : scorePercent,
        // ["comment"] : feedback
      }    
    resultArray.push(obj) 
    }
    
}


function addAverageForLearnerToResult(result){
    let count =0;
    while(count <= result.length-1){
       
        let average = 0;
        let num = 0;
        let obj = result[count];
        for(k in obj) {
           if(k != "id" && k != "comment") {average +=(obj[k]) ; num ++}
        }
        obj["avg"] = Math.round((average / num)*100)/100; 
        count ++ ;
    }
}



getLearnerData(courseInfo,assignmentGroup,learnerSubmissionArray)
addAverageForLearnerToResult(result)

console.log(result)