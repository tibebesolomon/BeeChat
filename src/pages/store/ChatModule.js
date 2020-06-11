import firebase from "firebase";
import * as db from './db'

const ChatModule = {
  state: {
    contacts:[]
  },
  getters: {
    contacts: state => state.contacts,

  },
  mutations: {
    setContacts(state, payload){
      state.contacts = payload;
    },
  },
  actions: {
    async getMyRequests({commit}){
      var users = await dispatch('getAllUsers')
      db.firerequest.child(firebase.auth().currentUser.uid)
      .on('value',snapshot=>{
        console.log('getmyrequest',snapshot.val())
        var frd_request_id = _.map(snapshot.val(),"sender")
        console.log('frd_request_id', frd_request_id)
        _.forEach(frd_request_id, uid=>{

        })
      })
    },
    getAllUsers({commit}){
      var promise = new Promise((resolve,reject)=>{
        firebase.database().ref('users').on('value', function(snapshot){
          console.log(snapshot.val())
          commit('setContacts',snapshot.val())
          resolve(snapshot.val())
        })
      })
      return promise
    },
    sendRequest({commit},payload){
      var promise = new Promise((resolve,reject)=>{
        firebase.database().ref('/requests')
        db.firerequest.child(payload.recipient).push({sender:payload.sender})
        .then(()=>{
          resolve({success:true})
        })
        .catch(err=>{
          reject(err)
        })
      })
      return promise
    }
  }
    
};
export default ChatModule;
