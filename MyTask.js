import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = "MY_TASK"

TaskManager.defineTask(TASK_NAME, () => {
  try {
    const receivedNewData = "My Task (Fetch): " + Math.random();

    console.log(receivedNewData);


    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
      console.log(error);
    return BackgroundFetch.Result.Failed;
  }
});

const register = () => {
    return BackgroundFetch.registerTaskAsync( TASK_NAME, {
        minimumInterval: 2, //intervalo minimo de dois segundos
        stopOnTerminate: false,
    })
}

const unregister = () =>{
    return BackgroundFetch.unregisterTaskAsync( TASK_NAME )
}

export default{
    register,
    unregister,
}