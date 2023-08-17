import Joi from 'joi';
import { CONFIG_DB_SCHEMA, ConfigModule } from '../config.module';
import { Test } from '@nestjs/testing';
import { join } from 'path';
function expectValidate(schema: Joi.Schema, value: any) {
  return expect(schema.validate(value, { abortEarly: false }).error.message);
}

describe('Schema Unit Tests', () => {
  describe('DB Schema', () => {
    const schema = Joi.object({
      ...CONFIG_DB_SCHEMA,
    });

    describe('DB_VENDOR', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, {}).toContain('"DB_VENDOR" is required');
      });

      test('invalid cases - mysql | sqlite', () => {
        expectValidate(schema, { DB_VENDOR: 10 }).toContain(
          '"DB_VENDOR" must be one of [mysql, sqlite]',
        );
      });

      test('valid cases - mysql | sqlite', () => {
        const arrange = ['mysql', 'sqlite'];
        arrange.forEach((value) => {
          expectValidate(schema, { DB_VENDOR: value }).not.toContain(
            'DB_VENDOR',
          );
        });
      });
    });

    describe('DB_HOST', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, {}).toContain('"DB_HOST" is required');
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_HOST: 10 }).toContain(
          '"DB_HOST" must be a string',
        );
      });

      test('valid cases', () => {
        expectValidate(schema, {
          DB_HOST: '127.0.0.1',
        }).not.toContain('DB_HOST');
      });
    });

    describe('DB_DATABASE', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'mysql' }).toContain(
          '"DB_DATABASE" is required',
        );
      });

      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'sqlite' }).not.toContain(
          '"DB_DATABASE" is required',
        );
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_DATABASE: 10 }).toContain(
          '"DB_DATABASE" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = [
          { DB_VENDOR: 'sqlite' },
          { DB_VENDOR: 'sqlite', DB_DATABASE: 'some value' },
          { DB_VENDOR: 'mysql', DB_DATABASE: 'some value' },
        ];

        arrange.forEach((value) => {
          expectValidate(schema, value).not.toContain('DB_DATABASE');
        });
      });
    });

    describe('DB_USERNAME', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'mysql' }).toContain(
          '"DB_USERNAME" is required',
        );
      });

      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'sqlite' }).not.toContain(
          '"DB_USERNAME" is required',
        );
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_USERNAME: 10 }).toContain(
          '"DB_USERNAME" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = [
          { DB_VENDOR: 'sqlite' },
          { DB_VENDOR: 'sqlite', DB_USERNAME: 'some value' },
          { DB_VENDOR: 'mysql', DB_USERNAME: 'some value' },
        ];

        arrange.forEach((value) => {
          expectValidate(schema, value).not.toContain('DB_USERNAME');
        });
      });
    });

    describe('DB_PASSWORD', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'mysql' }).toContain(
          '"DB_PASSWORD" is required',
        );
      });

      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'sqlite' }).not.toContain(
          '"DB_PASSWORD" is required',
        );
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_PASSWORD: 10 }).toContain(
          '"DB_PASSWORD" must be a string',
        );
      });

      test('valid cases', () => {
        const arrange = [
          { DB_VENDOR: 'sqlite' },
          { DB_VENDOR: 'sqlite', DB_PASSWORD: 'some value' },
          { DB_VENDOR: 'mysql', DB_PASSWORD: 'some value' },
        ];

        arrange.forEach((value) => {
          expectValidate(schema, value).not.toContain('DB_PASSWORD');
        });
      });
    });

    describe('DB_PORT', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'mysql' }).toContain(
          '"DB_PORT" is required',
        );
      });

      test('invalid cases - required', () => {
        expectValidate(schema, { DB_VENDOR: 'sqlite' }).not.toContain(
          '"DB_PORT" is required',
        );
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_PORT: 'invalid_port' }).toContain(
          '"DB_PORT" must be a number',
        );
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_PORT: '1.2' }).toContain(
          '"DB_PORT" must be an integer',
        );
      });

      test('valid cases', () => {
        const arrange = [
          { DB_VENDOR: 'sqlite' },
          { DB_VENDOR: 'sqlite', DB_PORT: 8080 },
          { DB_VENDOR: 'mysql', DB_PORT: 8080 },
        ];

        arrange.forEach((value) => {
          expectValidate(schema, value).not.toContain('DB_PORT');
        });
      });
    });

    describe('DB_LOGGING', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, {}).toContain('"DB_LOGGING" is required');
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_LOGGING: 10 }).toContain(
          '"DB_LOGGING" must be a boolean',
        );
      });

      test('valid cases', () => {
        const arrange = [true, false, 'true', 'false'];
        arrange.forEach((value) => {
          expectValidate(schema, value).not.toContain('DB_LOGGING');
        });
      });
    });

    describe('DB_AUTO_LOAD_MODELS', () => {
      test('invalid cases - required', () => {
        expectValidate(schema, {}).toContain(
          '"DB_AUTO_LOAD_MODELS" is required',
        );
      });

      test('invalid cases', () => {
        expectValidate(schema, { DB_AUTO_LOAD_MODELS: 10 }).toContain(
          '"DB_AUTO_LOAD_MODELS" must be a boolean',
        );
      });

      test('valid cases', () => {
        const arrange = [true, false, 'true', 'false'];
        arrange.forEach((value) => {
          expectValidate(schema, { DB_LOGGING: value }).not.toContain(
            'DB_LOGGING',
          );
        });
      });
    });
  });
});

describe('ConfigModule Unit Tests', () => {
  it('should throw an error when env vars are invalid', () => {
    try {
      Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: join(__dirname, '.env.fake'),
          }),
        ],
      });
      fail('ConfigModule should throw an error when env vars are invalid');
    } catch (e) {
      expect(e.message).toContain('"DB_VENDOR" must be one of [mysql, sqlite]');
    }
  });

  it('should be valid', () => {
    const module = Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    });

    expect(module).toBeDefined();
  });
});
