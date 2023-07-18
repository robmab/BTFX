"""empty message

Revision ID: 267af7a4b92a
Revises: 0f967dff304e
Create Date: 2023-07-18 13:25:15.478001

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '267af7a4b92a'
down_revision = '0f967dff304e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('competition', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_celebration', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('time_celebration', sa.Time(), nullable=True))
        batch_op.add_column(sa.Column('date_license', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('organizer', sa.String(length=30), nullable=True))
        batch_op.add_column(sa.Column('participation_limit', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('email_incidents', sa.String(length=30), nullable=True))
        batch_op.drop_column('email_incidencias')
        batch_op.drop_column('limite_participacion')
        batch_op.drop_column('organizador')
        batch_op.drop_column('hora_celebracion')
        batch_op.drop_column('fecha_celebracion')
        batch_op.drop_column('fecha_verificar_licencia')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', sa.Enum('Hombre', 'Mujer', name='sexo'), nullable=True))
        batch_op.add_column(sa.Column('date', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('license', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('federated', sa.Enum('Sí', 'No', name='federado'), nullable=True))
        batch_op.drop_constraint('user_licencia_key', type_='unique')
        batch_op.create_unique_constraint(None, ['license'])
        batch_op.drop_column('licencia')
        batch_op.drop_column('sexo')
        batch_op.drop_column('fecha_nacimiento')
        batch_op.drop_column('federado')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('federado', postgresql.ENUM('Sí', 'No', name='federado'), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('fecha_nacimiento', sa.DATE(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('sexo', postgresql.ENUM('Hombre', 'Mujer', name='sexo'), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('licencia', sa.VARCHAR(length=20), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('user_licencia_key', ['licencia'])
        batch_op.drop_column('federated')
        batch_op.drop_column('license')
        batch_op.drop_column('date')
        batch_op.drop_column('gender')

    with op.batch_alter_table('competition', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fecha_verificar_licencia', sa.DATE(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('fecha_celebracion', sa.DATE(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('hora_celebracion', postgresql.TIME(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('organizador', sa.VARCHAR(length=30), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('limite_participacion', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('email_incidencias', sa.VARCHAR(length=30), autoincrement=False, nullable=True))
        batch_op.drop_column('email_incidents')
        batch_op.drop_column('participation_limit')
        batch_op.drop_column('organizer')
        batch_op.drop_column('date_license')
        batch_op.drop_column('time_celebration')
        batch_op.drop_column('date_celebration')

    # ### end Alembic commands ###