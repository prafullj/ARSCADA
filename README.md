# ARSCADA
Augmented Reality add on to Ignition SCADA
Installation manual for AR-SCADA

1· Download the evaluation version of AR-SCADA from https://github.com/PRAMANJ/ARSCADA as a zip file on your system

2·The zip file will be downloaded with name ARSCADA-master.zip on your system.

3·Extract the zip file and it will create a folder ARSCADA-master where ever it’s kept.

4·Enter the folder ARSCADA-master it will contain a ARS folder

5·Copy the ARS folder and paste it at C: and you should have the ARS demo version installed on C:\ARS directory.

6·There are two sample projects kept under folder C:\ARS\DOCS named new_2019-07-11_2356_partial.proj for Ignition 7.9.10 and ars_2019-07-11_2206.zip for Ignition version 8 respectively. If your Ignition version is one of these then import the respective project in Ignition using designer and you are ready to launch AR-SCADA client.

7·Open the file C:\ARS\viewer\embedhost.js and change the hostname to your ignition server host name and project name to "ars" for ignition 8 and "new" for version 7.9 and save the file.(If parameter cycle_time is defined , then ensure this is your cycle time of scanning data base.

8·Ensure your ignition is running on the server (in case it’s a trial version ensure to start trial period)?

9. Download the webdev module corrosponding to the Ignition version that you have from archive https://inductiveautomation.com/downloads/archive Inductive Automation Modules > scroll down to device connectivity modules > scrol down to last and click webdev module. For Ignition version 8, the webdev is kept at  https://inductiveautomation.com/downloads/ignition . Install it on Ignition thru configure>modules menu from the Ignition home page.

10·In latest version of HTML5 browser (preferably chrome, as AR-SCADA was developed and tested on chrome)  open link
http://\<hostname\>:8088/main/system/webdev/\<ars\>/ARS/systemlist.html· Where replace \<hostname\> and \<ars\> as follows:
  Replace \<hostname\> (without \< and \>) with your ignition’s host name (to get host name open command prompt on the Ignition server and type hostname on the command prompt and press enter, it will display the hostname, copy and paste it where ever required.
  Replace \<ars\> (without \< and \>) with name of your project (case sensitive). default project name is ars.
  
For example http://pramanj:8088/main/system/webdev/ars/ARS/systemlist.html
The demo should word now. It will stop updating values after 60 seconds then you can refresh or change page to continue.
=================== INSTRUCTIONS FOR RUNNING RWS (REMOTE WEB SERVICES) MODULE =================================

11. The RWS module is an extension of ARSCADA module that allows you to communicate with Ignion and your HTML page using restful web service calls to read and write to Ignition tags. This allows you to have your own HTML page to dislay tags in a varity of formats using many open source libraries such as jquery, chart.js, and many more.

12. With the running in evaluation mode or licensed mode, open a new tab or window in browser and enter URL http://pramanj:8088/main/system/webdev/ars/ARS/rws/rws.html for version 8 and http://pramanj:8088/main/system/webdev/new/ARS/rws/rws.html for version 7.9 of Ignition. This html page shows how to do a simple read/write operation using the RWS module. The html page rws1.html in the directory C:/ARS/RWS/rws1.html shows a sample use of open source libraries such as chart.js and jquery.

With this RWS module you can define any number of HTML pages to display Ignition parameters and to give input commands using write option.
