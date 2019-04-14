# ARSCADA
Augmented Reality add on to Ignition SCADA
Installation manual for AR-SCADA

1· Download the evaluation version of AR-SCADA from https://github.com/PRAMANJ/ARSCADA as a zip file on your system

2·The zip file will be downloaded with name ARSCADA-master.zip on your system.

3·Extract the zip file and it will create a folder ARSCADA-master where ever it’s kept.

4·Enter the folder ARSCADA-master it will contain a ARS folder

5·Copy the ARS folder and paste it at C: and you should have the ARS demo version installed on C:\ARS directory.

6·There are two sample projects kept under folder C:\ARS\DOCS named new_2019-02-25_1055.proj or new_2019_03_0933.proj and new_2019-02-15_1846.proj for Ignition version 7.9.10 and 8 respectively. If your Ignition version is one of these then import the respective project in Ignition using designer and you are ready to launch AR-SCADA client.

7·Open the file C:\ARS\viewer\embedhost.js and change the hostname to your ignition server host name and project name to new (or to your project name if it’s other than default) and save the file.

8·Ensure your ignition is running on the server (in case it’s a trial version ensure to start trial period)?

9. Download the webdev module corrosponding to the Ignition version that you have from archive https://inductiveautomation.com/downloads/archive Inductive Automation Modules > scroll down to device connectivity modules > scrol down to last and click webdev module.

9·In latest version of HTML5 browser (preferably chrome, as AR-SCADA was developed and tested on chrome)  open link
http://\<hostname\>:8088/main/system/webdev/new/ARS/systemlist.html
  
10·replace \<hostname\> with your ignition’s host name (to get host name open command prompt on the Ignition server and type hostname on the command prompt and press enter, it will display the hostname, copy and paste it where ever required.
  
For example http://pramanj:8088/main/system/webdev/new/ARS/systemlist.html
The demo should word now. It will stop updating values after 60 seconds then you can refresh or change page to continue.
