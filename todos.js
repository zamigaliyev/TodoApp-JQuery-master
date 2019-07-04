class Todo{
    constructor(name){
        this.name = name;
        this.status = false;
    }
    set_status (value){
        this.status = value === true ? true : false;
    }
}
class Todoes {
    constructor(){
        this.todoes = []
    }
    add_todo(todo){
        if (todo instanceof Todo){
            this.todoes.push(todo)
        }
    }
    get_all(){
        return this.todoes
    }
    get_actives(){
        return this.todoes.filter(function(value,index){
            return !value.status
        })
    }
    get_completed_ones(){
        return this.todoes.filter(function(value, index){
            return value.status
        })
    }
    
    remove(todo){
        let index = this.todoes.indexOf(todo)
        if(index != -1){
            delete this.todoes[index]
        }
    }
}

$(document).ready(function(){
    let tab = "all";
    let todoes = new Todoes()

    function printList(){
        if (tab == "all"){
            var list = todoes.get_all()
        } else if (tab == "actives"){
            var list = todoes.get_actives()
        } else if (tab == "completed"){
            var list = todoes.get_completed_ones()
        } else{
            var list = [];
        }
        
        $('.list').html('');
        for (let i = 0; i < list.length; i++){
            let todo = list[i];

            let dom = $('<div>');
            dom.addClass('item');
            if (todo.status){
                dom.addClass('completed')
            }
            dom.html(todo.name)

            dom.on('click', function(){
                console.log(todo)
                if (todo.status){
                    todo.set_status(false);
                } else{
                    todo.set_status(true);
                }
                printList()
            })

            let removeBtn = $('<span>');
            removeBtn.html('X');
            removeBtn.css({
                color: '#f00'
            })
            removeBtn.on('click', function(){
                todoes.remove(todo)
                printList()
            })
            dom.append(removeBtn)

            $('.list').append(dom)
        }
    }

    $('.btn').on('click', function(){
        tab = $(this).data('name');
        printList();
    })

    $('#new_todo_form').on('submit', function(e){
        e.preventDefault()
        let nt = new Todo($('.new_todo').val())

        todoes.add_todo(nt)
        printList();   
    })
})