var messageApi = Vue.resource('/message{/id}');

    Vue.component('message-form',{
        props: ['messages'],
        data: function (){
            return{
                name: '',
                price: '',
                date: ''
                // dateY: '',
                // dateM: '',
                // dateD: '',
            }
        },
        template:
            '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> ' +
            '    <div class="modal-dialog"> ' +
            '        <div class="modal-content"> ' +
            '            <div class="modal-header"> ' +
            '                <h5 class="modal-title" id="exampleModalLabel">Добавление записи</h5> ' +
            '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> ' +
            '            </div> ' +
            '            <div class="modal-body"> ' +
            '               <div>' +
            '<div>' +
            '<div class="row input-group m-1">' +
            '<input  class="col-4 form-control" type="text" name="date"   placeholder = "День-Месяц-Год" v-model="date">'+
            '</div>' +

            '<div class="row input-group m-1">' +
            '<input class="col-6 form-control" type="text" name="name"   placeholder = "Название" v-model="name">'+
            '<input class="col-6 form-control" type="text" name="price"   placeholder = "Цена" v-model="price">'+
            '</div>'+
            '               </div> ' +
            '            <div class="modal-footer"> ' +
            '                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button> ' +
            '                <button type="button" class="btn btn-primary"  @click="save">Добавить</button>' +
            '</div>' +
            '</div>' +
            '            </div> ' +
            '        </div> ' +
            '    </div> ' +
            '</div>',
        // '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> ' +
        //     '    <div class="modal-dialog"> ' +
        //     '        <div class="modal-content"> ' +
        //     '            <div class="modal-header"> ' +
        //     '                <h5 class="modal-title" id="exampleModalLabel">Добавление записи</h5> ' +
        //     '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> ' +
        //     '            </div> ' +
        //     '            <div class="modal-body"> ' +
        //     '               <div>' +
        //                         '<div>' +
        //                             '<div class="row input-group m-1">' +
        //                                 '<input  class="col-4 form-control" type="text" name="dateY"   placeholder = "Год" v-model="dateY">'+
        //                                 '<input class="col-4 form-control" type="text" name="dateM"   placeholder = "Месяц" v-model="dateM">'+
        //                                 '<input class="col-4 form-control" type="text" name="dateD"   placeholder = "День" v-model="dateD">'+
        //                             '</div>' +
        //
        //                             '<div class="row input-group m-1">' +
        //                                 '<input class="col-6 form-control" type="text" name="name"   placeholder = "Название" v-model="name">'+
        //                                 '<input class="col-6 form-control" type="text" name="price"   placeholder = "Цена" v-model="price">'+
        //                             '</div>'+
        //     '               </div> ' +
        //     '            <div class="modal-footer"> ' +
        //     '                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button> ' +
        //     '                <button type="button" class="btn btn-primary"  @click="save">Добавить</button>' +
        //                         '</div>' +
        //                     '</div>' +
        //     '            </div> ' +
        //     '        </div> ' +
        //     '    </div> ' +
        //     '</div>',

        methods:{
            save: function (){
                window.location.reload();
                // var message = {name: this.name, price: this.price, date: (this.dateY+'.'+this.dateM+'.'+this.dateD)}
                var message = {name: this.name, price: this.price, date: this.date }
                messageApi.save({},message).then(result =>
                    result.json().then(data => {
                        this.messages.push(data)
                }))
                // this.name = ''; this.price= ''; this.dateY= '';  this.dateM= ''; this.dateD= '';
                this.name = ''; this.price= ''; this.date= '';
            }
        }
    });

    Vue.component('message-row', {
        props: ['message',"messages",'messageAttr'],
        data: function (){
            return {

            }
        },

        template: '<div class="container mx-auto">' +
                    '<div class="input-group row mb-1">'+
                        '<input class="form-control col-4" type="text" name="name"  v-bind:value = "message.name" placeholder = "Название" @change="putChange">'+
                        '<input class="form-control col-3" type="text" name="price"  v-bind:value = "message.price" placeholder = "Цена" @change="putChange">'+
                        '<input class="form-control col-3" type="text" name="date"  v-bind:value = "message.date" placeholder = "Год-месяц-День" @change="putChange">'+
                        '<input class="btn btn-danger form-control col-2" type="button" value="Удалить" @click="del">' +
                    '</div>'+
                    '</div>',
        methods:{
            del: function (){
                window.location.reload();
                messageApi.remove({id: this.message.id}).then(result =>{
                    if (result.ok){
                        this.messages.splice(this.messages.indexOf(this.message),1);
                    }
                })
            },
            putChange: function (event){
                window.location.reload();
                var field = event["target"]['name']
                var val = event['target']['value']
                var message={}
                message[field]=val

                // console.log(this.message.id)
                messageApi.update({id: this.message.id},message).then(result =>
                    result.json().then(data => {
                        // console.log(data)
                        this.messages.splice(this.messages.indexOf(this.message),1,data);
                    }) )
            }
        }
    });


    Vue.component('message-list', {
        props: ['messages'],
        template:
            '<div>' +
                '<message-form :messages="messages" />' +
                '<message-row v-for="message in messages" :key="message.id" :message="message" :messages="messages"/>' +
            '</div>',
        created: function (){
            messageApi.get().then(result =>
                result.json().then(data =>
                    // console.log(data))
                    data.forEach(message => this.messages.push(message))
                )
            )
        }
    });

    var app = new Vue({
        el: '#app',
        template:'<message-list :messages="messages"/>',
        data: {
            messages: []
        }
    })
//
// Vue.component('modal-template',{
//     props: ['showModal'],
//         template: '<transition name="modal">' +
//                 '<div class="modal-mask">' +
//         '          <div class="modal-wrapper">' +
//         '            <div class="modal-container">' +
//         '              <div class="modal-header">' +
//         '                <slot name="header">' +
//         '                  default header' +
//         '                </slot>' +
//         '              </div>' +
//         '              <div class="modal-body"> ' +
//         '                <slot name="body">' +
//         '                  default body' +
//         '                </slot>' +
//         '              </div>' +
//         '              <div class="modal-footer">' +
//         '                <slot name="footer">' +
//         '                  default footer' +
//         '                  <button class="modal-default-button" v-bind:@click="showModal = false">' +
//         '                    OK' +
//         '                  </button>' +
//         '                </slot>' +
//         '              </div>' +
//         '            </div>' +
//         '          </div>' +
//         '        </div>' +
//         '      </transition>'
// });
//
// Vue.component("modal", {
//     props: ['showModal'],
//     template: "<modal-template :showModal ='showModal'/>"
// });
//
// // start app
// new Vue({
//     el: "#app2",
//     data: {
//         showModal: false
//     }
// });

