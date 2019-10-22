# ARSCADA
Augmented Reality add on to Ignition SCADA
Installation manual for AR-SCADA

1· Download the evaluation version of AR-SCADA from https://github.com/PRAMANJ/ARSCADA as a zip file on your system

2·The zip file will be downloaded with name ARSCADA-master.zip on your system.

3·Extract the zip file and it will create a folder ARSCADA-master where ever it’s kept.

4·Enter the folder ARSCADA-master it will contain an ARS folder

5·Copy the ARS folder and paste it at C: root folder and you should have the ARS demo version installed on C:\ARS directory.

6.Download the webDev module corrosponding to the Ignition version that you have from the archive https://inductiveautomation.com/downloads/archive Inductive Automation Modules->scroll down to device connectivity modules->scroll down to last and click webDev module. For Ignition version 8, the webDev is kept at  https://inductiveautomation.com/downloads/ignition . Install it on Ignition thru configure->modules menu from the Ignition home page.

7·There are two sample project files kept under folder C:\ARS\DOCS named new_2019-07-11_2356_partial.proj for Ignition 7.9.10 and ars_2019-07-11_2206.zip for Ignition version 8 respectively. Open the Ignition designer of the version you have installed and create a new project called "ars" and import the project resource file C:\ARS\DOCS\new_2019-07-11_2356_partial.proj or C:\ARS\DOCS\ars_2019-07-11_2206.zip in to the newly created project. If you already have the "ars" created from the last trial, then open it and import these projects and choose overwrite option for the webDev resources it will ask for.

8·Open the file C:\ARS\viewer\embedhost.js and change the hostname to your ignition server hostname and project name to "ars" and save the file. Parameter cycle_time is defined for RWS module which denotes the cycle time (in seconds) of scanning data base for the RWS module.

9·In the Tag browser window on left in designer, right click on the default tag provider and select "Import tags from XML and CSV" option and select file C:/ARS/DOCS/Tags.xml to import tags required for the ARSCADA demo. (if you have imported tags in previous trial, these tags may already exist, so no need of copying them). Ensure your ignition is running on the server (in case it’s a trial version ensure to start trial period).

10·Open a latest version of HTML5 browser (preferably chrome, as AR-SCADA was developed and tested on chrome)  open link
http://\<hostname\>:8088/main/system/webdev/\<ars\>/ARS/systemlist.html· Where \<hostname\> is your Ignition hostname and \<ars\> is your project name.  Replace \<hostname\> (without \< and \>) with your ignition’s host name (to get host name open command prompt on the Ignition server and type hostname on the command prompt and press enter, it will display the hostname, copy and paste it where ever required.  Replace \<ars\> (without \< and \>) with name of your project (case sensitive). Default project name is ars.

For example http://pramanj:8088/main/system/webdev/ars/ARS/systemlist.html
The demo should work now, start navigating the ARSCADA screens. The trial version will stop updating values after 60 seconds then you can refresh or change page to continue. Once you obtain a Licensed version, the update will continue without stopping.

===== INSTRUCTIONS FOR RUNNING RWS (REMOTE WEB SERVICES) MODULE ===========

11. The RWS module is a subset of ARSCADA module that allows you to communicate with Ignion using restful web service calls in an HTML page to read and write to Ignition tags. This opens a lot of new possibilities for you to Interact with Ignition server through your own HTML page using many open source libraries such as jquery, chart.js, svg graphics and much more more such as XL web services etc.

12 The RWS module files are stored in C:/ARS/RWS folder in the ARSCADA_master.zip file when you download it. This folder contains following files : embedhost.js - defining configuration such as hostname, project name, cycle_time of update etc; tags.txt - giving the tags list of atomic tag names to be fetch from ignition; rws.html and rws1.html - two sample html pages showing a simple and a complex demo of rws module; rws.js - the .js code that commnicates with webDev module on Ignition with RWS calls. You have to edit the embedhost.js file to give proper configuration of RWS module. (parameters are self explainatory and same as those for ARS module in step 8.

13. Run the Ignition server in evaluation mode or licensed mode upto step 9 above. Open a new tab or window in client browser and enter URL http://pramanj:8088/main/system/webdev/ars/ARS/rws/rws1.html . This html page shows sample use of open source libraries such as chart.js and jquery along with the RWS module. You can open the file C:/ARS/RWS/rws1.html file in an editor to see the structure of HTML and .js code embedded there. The url http://pramanj:8088/main/system/webdev/ars/ARS/rws/rws.html shows a simple read/write operation using the RWS module without any third party libraries. Inspect the code of rws.html to see how to read write tags from Ignition server.

You can define any number of your own HTML pages to display Ignition parameters and to give input commands using write option.
