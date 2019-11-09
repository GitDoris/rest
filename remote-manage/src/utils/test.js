(function () {
    function bb() {
        console.log("BB");

    }
    function All(){
    }
    All.prototype={
        a:function(){
            console.log("我是AA");
        },
        b:function(){

        },
        c:bb()
    };
    window.func=new All();

})(window)
