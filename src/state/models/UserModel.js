import BaseModel, { Field, FieldType } from "../BaseModel";
import { makeObservable, observable } from "mobx";
import {
  emailUniqueValidator,
  emailValidator,
  passwordValidator,
  samePasswordValidator,
} from "./validators";

class UserModel extends BaseModel {
  constructor() {
    super();
    makeObservable(this, {
      id: observable,
      first_name: observable,
      last_name: observable,
      artist_name: observable,
      password: observable,
      email: observable,
      email_verified_at: observable,
      remember_token: observable,
      title: observable,
      business: observable,
      profile_pic: observable,
      entities: observable,
      address: observable,
      city: observable,
      province: observable,
      postal: observable,
      country: observable,
      lang: observable,
      phone: observable,
      last_login: observable,
      accept_terms: observable,
      status: observable,
      created_at: observable,
      updated_at: observable,
    });
  }
  id = new Field(this, "id", {
    label: "id",
    required: false,
    type: FieldType.string,
    primary: true,
  });
  first_name = new Field(this, "first_name", {
    label: "first_name",
    required: false,
    type: FieldType.string,
  });
  last_name = new Field(this, "last_name", {
    label: "last_name",
    required: false,
    type: FieldType.string,
  });
  artist_name = new Field(this, "artist_name", {
    label: "artist_name",
    required: false,
    type: FieldType.string,
  });
  email = new Field(this, "email", {
    label: "email",
    required: true,
    type: FieldType.string,
    validation: emailValidator,
    asyncValidation: emailUniqueValidator,
  });
  password = new Field(this, "password", {
    label: "Password",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:enterEmail",
    validation: passwordValidator,
  });
  confirmPassword = new Field(this, "confirmPassword", {
    label: "Password",
    required: true,
    type: FieldType.string,
    requiredMessage: "errors:confirmPassword",
    validation: samePasswordValidator,
    pseudo: true,
  });
  email_verified_at = new Field(this, "email_verified_at", {
    label: "email_verified_at",
    required: false,
    type: FieldType.date,
    default: null,
  });
  stay_connected = new Field(this, "stay_connected", {
    label: "remember_token",
    required: false,
    type: FieldType.bool,
    default: false,
  });
  remember_token = new Field(this, "remember_token", {
    label: "remember_token",
    required: false,
    type: FieldType.string,
    default: null,
  });
  title = new Field(this, "title", {
    label: "title",
    required: false,
    type: FieldType.string,
  });
  business = new Field(this, "business", {
    label: "business",
    required: false,
    type: FieldType.string,
  });
  profile_pic = new Field(this, "profile_pic", {
    label: "profile_pic",
    required: false,
    type: FieldType.string,
  });
  entities = new Field(this, "entities", {
    label: "entities",
    required: false,
    type: FieldType.string,
  });
  address = new Field(this, "address", {
    label: "address",
    required: false,
    type: FieldType.string,
  });
  province = new Field(this, "province", {
    label: "province",
    required: false,
    type: FieldType.string,
  });
  city = new Field(this, "city", {
    label: "city",
    required: false,
    type: FieldType.string,
  });
  country = new Field(this, "country", {
    label: "country",
    required: false,
    type: FieldType.string,
  });
  postal = new Field(this, "postal", {
    label: "postal",
    required: false,
    type: FieldType.string,
  });
  lang = new Field(this, "lang", {
    label: "lang",
    required: false,
    type: FieldType.string,
  });
  phone = new Field(this, "phone", {
    label: "phone",
    required: false,
    type: FieldType.string,
  });
  last_login = new Field(this, "last_login", {
    label: "last_login",
    required: false,
    type: FieldType.date,
    pseudo: true,
    default: null,
  });
  status = new Field(this, "status", {
    label: "status",
    required: false,
    type: FieldType.string,
    default: 0,
  });
  accept_terms = new Field(this, "accept_terms", {
    label: "accept_terms",
    required: true,
    type: FieldType.bool,
    default: false,
  });
  redirect_url = new Field(this, "redirect_url", {
    label: "redirect_url",
    required: false,
    type: FieldType.string,
  });
  zum_user_id = new Field(this, "zum_user_id", {
    label: "zum_user_id",
    required: false,
    type: FieldType.string,
  });
  created_at = new Field(this, "created_at", {
    label: "created_at",
    required: false,
    type: FieldType.date,
    pseudo: true,
  });
  updated_at = new Field(this, "updated_at", {
    label: "updated_at",
    required: false,
    type: FieldType.date,
    pseudo: true,
  });
}

export default UserModel;
