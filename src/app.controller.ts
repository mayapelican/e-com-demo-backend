import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

/**
 * Demo jest test case endpoint
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

/**
 * Heath checking endpoint
 * Created By MayanthaJ 02 01 2024
 * Updated By Name, Date, Note
 * Version : 1
 */
  @Get('/health')
  healthCheck(@Res() res: Response) {
    res.status(200).json({ "status": "running" })
  }
}
