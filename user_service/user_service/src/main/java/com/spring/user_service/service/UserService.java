package com.spring.user_service.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.user_service.entity.User;
import com.spring.user_service.repository.UserRepository;
import com.spring.user_service.util.JwtUtil;

@Service
public class UserService implements UserDetailsService {

	private UserRepository userRepository;

	private JwtUtil jwtUtil;

	private PasswordEncoder passwordEncoder;
	

	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,JwtUtil jwtUtil 
) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil=jwtUtil;
		
		
	}

	public User register(User user) {
		System.out.println(user.getPassword());
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		return userRepository.save(user);

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			System.out.println("User not found with username: " + username);
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());

	}

	public Map<String, String> findByUsername(String username) {
		System.out.println("From Controller: " + username);
		UserDetails userDetails = loadUserByUsername(username);
		String token = jwtUtil.generateToken(userDetails.getUsername());
		Map<String, String> response = new HashMap<>();
		response.put("JWT Token", token);
		System.out.println("Generated Token: " + response.get("JWT Token"));
		return response;

	}

	public User findByUser(String username) {

		return userRepository.findByUsername(username);
	}


}


