import { Routes } from '@angular/router';
import { Authlayout } from './layouts/authlayout/authlayout';
import { Signup } from './core/auth/signup/signup';
import { Signin } from './core/auth/signin/signin';
import { Mainlayout } from './layouts/mainlayout/mainlayout';
import { Timeline } from './features/timeline/components/timeline/timeline';
import { noauthGuard } from './core/guards/noauth/noauth-guard';
import { authGuard } from './core/guards/auth/auth-guard';
import { Component } from '@angular/core';
import { Profile } from './shared/components/profile/profile';
import { Notification } from './shared/components/notification/notification';
import { PostDetlails } from './shared/components/post-detlails/post-detlails';
import { UserProfile } from './shared/components/user-profile/user-profile';
import { NotFound } from './features/notfound/not-found/not-found';
import { Settings } from './features/Settings/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'timeline', pathMatch: 'full' },
  {
    path: "", component: Authlayout,canActivate : [noauthGuard] ,children: [
      { path: "signup", component: Signup },
      { path: "signin", component: Signin }
      
    ]
  },
  {
    path: "", component: Mainlayout, canActivate: [authGuard], children: [
      { path: "timeline", component: Timeline },
      { path: "post-details/:id", component: PostDetlails },
      { path: "profile", component: Profile },
      { path: "profile/:id", component: UserProfile },
      { path: "settings", component: Settings },
      { path: "notification", component: Notification },
      { path: "**", component: NotFound }
  ]}
];
