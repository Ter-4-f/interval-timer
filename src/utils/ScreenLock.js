// Source: https://progressier.com/pwa-capabilities/screen-wake-lock



export function toggleWakeLock(){
    if (!navigator.wakeLock){
      alert("Your device does not support the Wake Lock API. Try on an Android phone or on a device running iOS 16.4 or higher!");
    } else if (window.currentWakeLock && !window.currentWakeLock.released){
      releaseScreen();
    } else {
      lockScreen();
    }  
  }
  
  export async function lockScreen(){
    if (!navigator.wakeLock){
        alert("Your device does not support the Wake Lock API. Try on an Android phone or on a device running iOS 16.4 or higher!");
        return;
    }

    try       { window.currentWakeLock = await navigator.wakeLock.request(); }
    catch(err){ alert(err); }
  }
  
  async function releaseScreen(){
    window.currentWakeLock.release();
  }  