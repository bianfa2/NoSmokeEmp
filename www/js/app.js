var indexLighters = parseInt(localStorage.getItem("index"));
var app = new Framework7({

    root: '#app',
    name: 'NoSmoke',
    id: 'com.upb.nosmoke',
    panel: {
        swipe: 'left',
    },
    routes: [
        {
            path: '/home/',
            url: 'index.html',
        },
        {
            path: '/lighters/',
            url: 'pages/lighters-page.html',
            on: {
                pageInit: function (event, page) {
                    if(indexLighters){
                        for(var i = 0; i < indexLighters; i++){
                            show_lighter(localStorage.getItem(i));                            
                        }
                    }
                }
            }
        },
        {
            path: '/lung/',
            url: 'pages/lung-page.html',
        },
        {
            path: '/heart/',
            url: 'pages/heart-page.html',
        },
        {
            path: '/brain/',
            url: 'pages/brain-page.html',
        },
        {
            path: '/head/',
            url: 'pages/head-face-page.html',
        },
        {
            path: '/dna/',
            url: 'pages/dna-page.html',
        },
        {
            path: '/abdomen/',
            url: 'pages/abdomen-page.html',
        },
        {
            path: '/cardio/',
            url: 'pages/cardio-page.html',
            on: {
                pageInit: function (event, page) {
                    var cardioFilter = app.range.create({
                        el: '#cardioFilter',
                        min: 1,
                        max: 3,
                        label: true,
                        step: 1,
                        value: 1,
                        scale: true,
                        scaleSteps: 2,
                        scaleSubSteps: 7,
                        on: {
                            change: function () {
                              if(cardioFilter.value == 1){
                                $('#cardio2').addClass('none');
                                $('#cardio3').addClass('none');
                                $('#cardio1').removeClass('none');
                              }else if(cardioFilter.value == 2){
                                $('#cardio1').addClass('none');                              
                                $('#cardio3').addClass('none');                                
                                $('#cardio2').removeClass('none');
                              }else if(cardioFilter.value == 3){
                                $('#cardio1').addClass('none'); 
                                $('#cardio2').addClass('none');                                                             
                                $('#cardio3').removeClass('none');    
                              }
                            }
                        }
                    })
                }
            }
        },
        {
            path: '/fitness/',
            url: 'pages/fitness-page.html',
            on: {
                pageInit: function (event, page) {
                    var fitnessFilter = app.range.create({
                        el: '#fitnessFilter',
                        min: 1,
                        max: 4,
                        label: true,
                        step: 1,
                        value: 1,
                        scale: true,
                        scaleSteps: 3,
                        scaleSubSteps: 7,
                        on: {
                            change: function () {
                              if(fitnessFilter.value == 1){
                                $('#fitness2').addClass('none');
                                $('#fitness3').addClass('none');
                                $('#fitness4').addClass('none');
                                $('#fitness1').removeClass('none');
                              }else if(fitnessFilter.value == 2){
                                $('#fitness1').addClass('none');                              
                                $('#fitness3').addClass('none');       
                                $('#fitness4').addClass('none');                         
                                $('#fitness2').removeClass('none');
                              }else if(fitnessFilter.value == 3){
                                $('#fitness1').addClass('none'); 
                                $('#fitness2').addClass('none');         
                                $('#fitness4').addClass('none');                                                    
                                $('#fitness3').removeClass('none');    
                              }else if(fitnessFilter.value == 4){
                                $('#fitness1').addClass('none'); 
                                $('#fitness2').addClass('none');                                 
                                $('#fitness3').addClass('none'); 
                                $('#fitness4').removeClass('none');     
                              }
                            }
                        }
                    })
                }
            }           
        },
        {
            path: '/fullBody/',
            url: 'pages/full-body-page.html',
        },
        {
            path: '/push/',
            url: 'pages/push-page.html',
        },
        {
            path: '/pull/',
            url: 'pages/pull-page.html',
        },
        {
            path: '/legs/',
            url: 'pages/legs-page.html',
        },
    ],
});

var mainView = app.views.create('.view-main');

if(!localStorage.getItem("index")){
    localStorage.setItem("index", 0);
}