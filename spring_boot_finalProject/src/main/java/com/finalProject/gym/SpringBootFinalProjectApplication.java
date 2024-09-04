package com.finalProject.gym;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.finalProject.gym"})
@MapperScan(basePackages = {"com.finalProject.gym"})
public class SpringBootFinalProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootFinalProjectApplication.class, args);
	}

}
