package com.finalProject.gym.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalProject.gym.service.SendSMSService;

import net.nurigo.java_sdk.exceptions.CoolsmsException;



@Controller
public class SendSMSController {
	
	private final SendSMSService sendSMSService;

    @Autowired
    public SendSMSController(SendSMSService sendSMSService) {
        this.sendSMSService = sendSMSService;
    }
			
    @GetMapping("/sms")
    public String mySms() {
    	return "member/authenticationForm";
    }
        
    // coolSMS 구현 로직 연결  
    @GetMapping("/check/sendSMS")
    public @ResponseBody String sendSMS(@RequestParam(value="to") String to) throws CoolsmsException {  	
    	return sendSMSService.PhoneNumberCheck(to);
    }
   
	
    
}
