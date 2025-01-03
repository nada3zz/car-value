import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  IsEmail,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword(
    {},
    {
      message:
        'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    },
  )
  @Length(8, 18)
  password: string;
}
