package com.dh.booking.security;

import com.dh.booking.security.jwt.JwtRequestFilter;
import com.dh.booking.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(
                        "/v2/api-docs"
                        ,"/",
                        "/favicon.ico",
                        "/**/*.png",
                        "/**/*.gif",
                        "/**/*.svg",
                        "/**/*.jpg",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js")
                .permitAll()
                .antMatchers(
                        "/webjars/**",
                        "/swagger-resources/**"
                )
                .permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.POST, "/clients").permitAll()
                .antMatchers(HttpMethod.POST, "/cars/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.GET, "/cars/**").permitAll()
                .antMatchers(HttpMethod.GET, "/features/**").permitAll()
                .antMatchers(HttpMethod.GET, "/booking/car/**").permitAll()
                .antMatchers(HttpMethod.GET, "/clients/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.POST, "/booking/**").hasAnyAuthority("Client","Admin")
                .antMatchers(HttpMethod.GET, "/cities/**").permitAll()
                .antMatchers(HttpMethod.GET, "/rentPolicies/**").permitAll()
                .antMatchers(HttpMethod.GET, "/categories/**").permitAll()
                .antMatchers(HttpMethod.GET, "/images/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/images/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/cities/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/categories/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/rentPolicies/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/rentPolicies/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/cars/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/clients/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/features/**").hasAuthority("Admin")
                .antMatchers(HttpMethod.DELETE, "/booking/**").hasAnyAuthority("Client","Admin")
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        provider.setUserDetailsService(authenticationService);

        return provider;
    }


}
