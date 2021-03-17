# rakuten_ui_automation_js
Interview

To execute use:

npx wdio run ./wdio.config.js

More Info: http://webdriver.io

Notes:
 - Taking into account the sections:
  * Login
  * Register
  * PDP
  * Whistlist
  
 There are to many options to verify the functionality, and the test-cases that the website needs to ensure the quality require more time to implemented.
 
 There is two issues: 
  1. Related to use the register form and using a previous registered credentials, the register form perform a login.
  2. The login form don't validate properly the e-mail format. It should indicat when a e-mail doesn't have a valid format.
  3. Make some ccs change to indicate what field is invalid.

Another thing that is about the framework:
 This implementation require to inclue some command to navigate properly in this page, and avoid the flaky test. It's a demo.
 I think that to test the PDP properly it's need to implement a class to get the information from service, then to chek with diferents types of elements, and see if the PDP support them.

 
 I use: node 12.18.3 but it should be work with the last LTS.
 
 Any Question, lararojas.mr@gmail.com  
