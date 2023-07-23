var courseAPI = 'http://localhost:3000/course';
var listCourseBlock = document.querySelector('.list-courses');

function start(){
    // getCourses(function(courses){
    //     listCourseBlock.innerHTML = renderCourses(courses);
    // });

    //Hoặc cách anh Sơn gọn 
    getCourses(renderCourses);
    handleCreateForm();
}

start();

//Các Functions
function getCourses(callback){
    fetch(courseAPI)
        .then((response)=>{
            return response.json();
        })
        .then(callback)
        .catch((err)=>{
            alert('Lỗi!!!');
        });
}

// function renderCourses(courses){
//     var htmls = courses.map(function(course){
//         return `<li>
//             <h2>${course.name}</h2>
//             <p>${course.description}</p>
//         </li>`
//     });
//     html = htmls.join('');
    
//     return html;
// }

//render theo F8
function renderCourses(courses){
    var listCourseBlock = document.querySelector('.list-courses');
    var htmls = courses.map(function(course){
        return `<li class="course-item-${course.id}">
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">&times;</button>
        </li>`
    });
    html = htmls.join('');
    listCourseBlock.innerHTML = html;
}

//Tạo mới khóa học
function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", //Truyền ở form-server nên có vẻ là ko đúng format chuyển sang form-urencoder mới đc
          },
        body: JSON.stringify(data)
    };
    fetch(courseAPI, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}


function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        };

        createCourse(formData, getCourses(renderCourses)); // lúc thêm thì dùng lại kết quả có được render lại luôn trang
    }
}

function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json", //Truyền ở form-server nên có vẻ là ko đúng format chuyển sang form-urencoder mới đc
          }
    };
    fetch(courseAPI + '/' + id, options) 
        .then(function(response){
            response.json();
        })
        .then(function(){
            // getCourses(renderCourses); 
            //Để hạn chế gọi lại API chúng ta xóa thẳng từ DOM
            var itemDelete = document.querySelector('.course-item-' + id);
            if(itemDelete){
                itemDelete.remove();
            }
        });
}

//BT: Có 1 nút sửa -> Bấm vào sẽ điền vào 2 ô -> Create biến thành nút Lưu -> Sửa bấm lưu sẽ tự render lại