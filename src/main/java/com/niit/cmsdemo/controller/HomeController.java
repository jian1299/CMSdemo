package com.niit.cmsdemo.controller;


import com.niit.cmsdemo.domain.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

/**登录页面**/

@Controller
public class HomeController {

    @GetMapping({"/login","/"})
    public String login(){
        return "login";
    }

    @PostMapping("/login")
    public String login(HttpServletRequest request, User user, Model model){
        if (StringUtils.isEmpty(user.getLoginId()) || StringUtils.isEmpty(user.getPassword())) {
            request.setAttribute("msg", "用户名或密码不能为空！");
            return "login";
        }
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token=new UsernamePasswordToken(user.getLoginId(),user.getPassword());
        try {
            subject.login(token);
            return "manage";
        }catch (LockedAccountException lae) {
            token.clear();
            request.setAttribute("msg", "用户已经被锁定不能登录，请与管理员联系！");
            return "login";
        } catch (AuthenticationException e) {
            token.clear();
            request.setAttribute("msg", "用户或密码不正确！");
            return "login";
        }
    }

    @GetMapping("/403")
    public String forbidden(){
        return "403";
    }
}
