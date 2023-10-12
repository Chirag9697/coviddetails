import { createMachine, assign } from "xstate";

const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwMQBd2oDoBjAJzAEMcwBtABgF1FQAHTASxzdQDsmQAPRAEYATAQDMogCwBOABzjxtEQqEA2EQBoQAT2G0ZBEbJmnxAVgDsluSLXiAvg+1oM2PBgIQwAGzBU6RiQQVlgOLl5gwQQhIQJTBMSk8W09GJEnZxBudDg+V0w+UPCePmi7AnNzKTU5OSEpcTU1GvNUxBFYghNTOUshKrVzEXNMhyA */
  id: "signing in",
  initial: "signin",
  context: {
    email: "",
  },
  states: {
    signin: {
      on: {
        // cond:(context,ev)=>ev.todo.message.length>0,

        // target:"todo.delete",
        Submit: {
            actions: assign({
                email: (context, ev) => {
                //   console.log("hello I am signin");
                //   console.log("sda",context);
                console.log(ev);
                  return context.email=ev.email;
                  // return;
                },
              }),
              target:"signedin"
        }
        // target:"hello",
      },
    },
    signedin: {
      on: {
        // entry:{
        // email:"dsacsd"
        // },
        // cond:(context,ev)=>ev.todo.message.length>0,
        actions: assign({
          email: (context) => {
            console.log("hello signedin");
          },
          // todos:(context,ev)=>{
          // console.log("delete",context);
          // ret/urn context.todos.filter((item)=>{
          // return item.id!=ev.todos.id
          // })

          // }
        }),
        logout:"signin",
      },
    },
   
  },
  // "hello":{
  // target:"idle"
  // }
});

export default machine;
